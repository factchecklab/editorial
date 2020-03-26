<i18n lang="yaml">
en:
  snackbar:
    close: Close
  validations:
    form:
      content:
        required: Content is required
        minLength: Content must be at least {min} character long | Content must be at least {min} characters long
zh-hk:
  snackbar:
    close: 關閉
  validations:
    form:
      content:
        required: 必須填上內容
        minLength: 內容太短，必須填上最少 {min} 個字
</i18n>
<template>
  <div class="col-lg-6 mx-auto">
    <v-card flat>
      <v-card-title>
        <h3>{{ $t('pages.reports.new.title') }}</h3>
      </v-card-title>
      <div v-if="page === pages.REPORT">
        <v-form ref="form" @submit.prevent="onSubmit">
          <v-textarea
            v-model="form.content"
            outlined
            required
            :label="$t('pages.reports.new.labels.content')"
            :error-messages="validationErrors.form.content"
            rows="5"
          />
          <v-text-field
            v-model="form.url"
            name="url"
            outlined
            :label="$t('pages.reports.new.labels.url')"
          />
          <v-file-input
            v-model="file"
            :label="$t('pages.reports.new.labels.attachment')"
            :placeholder="$t('pages.reports.new.placeholders.attachment')"
            prepend-icon="mdi-paperclip"
            outlined
          />
          <v-btn :loading="loading" color="primary" @click="onSubmit">
            {{ $t('pages.reports.new.buttons.submit') }}
          </v-btn>
          <v-btn :disabled="loading" @click="onReset">
            {{ $t('pages.reports.new.buttons.reset') }}
          </v-btn>
        </v-form>
      </div>
      <div v-else-if="page === pages.SIMILAR_TOPICS">
        <v-card-subtitle>
          <h4>
            {{
              $tc(
                'pages.reports.new.found_similar_topics',
                relatedReports.length
              )
            }}
          </h4>
        </v-card-subtitle>
        <!-- FIXME(cheungpat): Content field pending changes on the server -->
        <topic-card
          v-for="report in relatedReports"
          :id="report.id"
          :key="report.id"
          :title="report.title"
          :content="report.title"
          :created-at="report.createdAt"
          :updated-at="report.updatedAt"
          :valid="report.valid"
          embedded
          class="my-4"
        />
        <v-card-action>
          <v-form>
            <v-btn :loading="loading" color="primary" @click="onSubmitAnyway">
              {{ $t('pages.reports.new.buttons.submit_anyway') }}
            </v-btn>
            <v-btn :disabled="loading" @click="onGoBackToForm">
              {{ $t('pages.reports.new.buttons.go_back') }}
            </v-btn>
          </v-form>
        </v-card-action>
      </div>
    </v-card>
    <v-snackbar v-model="snackbar.show" color="error" :timeout="5000">
      {{ snackbar.text }}
      <v-btn text dark @click="snackbar.show = false">
        {{ $t('snackbar.close') }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { required, minLength } from 'vuelidate/lib/validators'
import TopicCard from '@/components/TopicCard.vue'
import { topicMarshaler } from '@/utils/marshalers.js'

const pages = {
  REPORT: Symbol('REPORT'),
  SIMILAR_TOPICS: Symbol('SIMILAR_TOPICS')
}

const defaultFormData = () => {
  return {
    content: '',
    url: '',
    attachments: []
  }
}

const formValidationErrors = (form, keypath, tc) => {
  return Object.keys(form)
    .filter((key) => !key.startsWith('$'))
    .reduce((result, key) => {
      const field = form[key]
      result[key] = fieldValidationErrors(field, `${keypath}.${key}`, tc)
      return result
    }, {})
}

const fieldValidationErrors = (field, keypath, tc) => {
  return Object.keys(field)
    .filter((key) => !key.startsWith('$'))
    .reduce((errors, key) => {
      const isValid = field[key]
      if (field.$dirty && !isValid) {
        const validator = field.$params[key]
        const messageKey = `${keypath}.${key}`
        let message
        if (validator && validator.type === 'minLength') {
          message = tc(messageKey, validator.min, {
            min: validator.min
          })
        } else {
          message = tc(messageKey)
        }

        errors.push(message || messageKey)
      }

      return errors
    }, [])
}

export default {
  layout: 'embed',
  components: {
    TopicCard
  },
  validations: {
    form: {
      content: { required, minLength: minLength(3) }
    }
  },
  data() {
    return {
      form: defaultFormData(),
      page: pages.REPORT,
      loading: false,
      file: null,
      snackbar: {
        show: false,
        text: ''
      },

      relatedReports: [],

      pages
    }
  },
  computed: {
    validationErrors() {
      return {
        form: formValidationErrors(
          this.$v.form,
          'form',
          (key, choice, values) => {
            return this.$tc(`validations.${key}`, choice, values)
          }
        )
      }
    }
  },
  methods: {
    async submit() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation SubmitTopic($input: SubmitTopicInput!) {
            submitTopic(input: $input) {
              submittedTopic {
                id
              }
            }
          }
        `,
        variables: {
          input: {
            content: this.form.content,
            source: 'Web Form',
            url: this.form.url,
            attachments: this.form.attachments
          }
        }
      })
    },

    async upload() {
      const {
        data: { uploadAsset }
      } = await this.$apollo.mutate({
        mutation: gql`
          mutation uploadAsset($file: Upload!) {
            uploadAsset(file: $file) {
              id
              url
              token
            }
          }
        `,
        variables: {
          file: this.file
        }
      })
      return uploadAsset
    },

    onReset() {
      this.form = defaultFormData()
      this.$v.$reset()
    },

    async findRelatedReports() {
      const {
        data: { relatedReports }
      } = await this.$apollo.query({
        query: gql`
          query RelatedReports($content: String) {
            relatedReports: searchRelatedReports(content: $content) {
              nodes {
                id
                title
                createdAt
                updatedAt
                conclusion
              }
            }
          }
        `,
        variables: {
          content: this.form.content
        },
        fetchPolicy: 'no-cache'
      })
      const { nodes } = relatedReports
      return (nodes || []).map(topicMarshaler)
    },

    async onSubmit() {
      this.$v.form.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.loading = true

      try {
        const relatedReports = await this.findRelatedReports()
        if (relatedReports.length > 0) {
          this.relatedReports = relatedReports
          this.loading = false
          this.page = pages.SIMILAR_TOPICS
          return
        }
      } catch (err) {
        this.snackbar = {
          show: true,
          text: this.$t('pages.reports.new.snackbars.error.content')
        }
        return
      } finally {
        this.loading = false
      }

      await this.onSubmitAnyway()
    },

    async onSubmitAnyway() {
      try {
        this.loading = true
        if (this.file) {
          const asset = await this.upload()
          this.form.attachments.push({
            type: 'asset',
            assetToken: asset.token
          })
        }
        await this.submit()
        this.$router.push(this.localePath({ name: 'embed-reports-thankyou' }))
      } catch (err) {
        this.snackbar = {
          show: true,
          text: this.$t('pages.reports.new.snackbars.error.content')
        }
      } finally {
        this.loading = false
      }
    },

    onGoBackToForm() {
      this.page = pages.REPORT
    }
  }
}
</script>
