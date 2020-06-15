<i18n lang="yaml">
en:
  title: Submit fake news
  snackbar:
    close: Close
    error:
      content: An error has occurred during submission. Please verify your input and submit again.
  validations:
    form:
      message:
        required: Message is required
        minLength: Message must be at least {min} character long | Message must be at least {min} characters long
  form:
    preamble: You can use this form to submit misinformation to Factcheck Lab. We will use the information you provide for fact checking.
    message:
      label: Message
      hint: You can copy the message contained in the misinformation and paste it here.
    url:
      label: Web address
      hint: If you saw the misinformation from a webpage, provide the web address (URL) here.
    attachment:
      label: Related attachments
      hint: If the misinformation is an image, you can send us the image by uploading it from here.
      placeholder: Click to browse for a file or drag the file here
    comment:
      label: Your opinion
      hint: If you have any opinion about the misinformation, let us know.
    submit:
      label: Submit
    reset:
      label: Reset
    submit_anyway:
      label: Submit Anyway
    go_back:
      label: Go Back
  found_similar_topics: "Found one similar topic: | Found { count } similar topics:"
zh-hk:
  title: 回報假消息
  snackbar:
    close: 關閉
    error:
      content: 報告時出現錯誤，請確認輸入無誤再發送。
  validations:
    form:
      message:
        required: 必須填上內容
        minLength: 內容太短，必須填上最少 {min} 個字
  form:
    preamble: 你可以利用這張表格，向 Factcheck Lab 提供假消息的資訊，以便我們可以展開事實查核。
    message:
      label: 假消息內容
      hint: 你可以從假消息的來源，把假消息的內容剪貼到這裡。
    url:
      label: 假消息網址
      hint: 如果你從一個網頁看到假消息，請把網址剪貼在這裡。
    attachment:
      label: 有關假消息的附件
      hint: 如果你找到的假消息是一張圖片，可以在這裡上載給我們。
      placeholder: 按此選擇檔案，或把檔案拖到這裡
    comment:
      label: 個人意見
      hint: 如果你對此假消息有任何意見，可以在這裡提出。
    submit:
      label: 提交
    reset:
      label: 重設
    submit_anyway:
      label: 確認提交
    go_back:
      label: 回到上一步
  found_similar_topics: "找到 {count} 個類似主題："

</i18n>
<template>
  <div class="col-lg-6 mx-auto">
    <v-card flat>
      <div v-if="page === pages.REPORT">
        <v-form ref="form" @submit.prevent="onSubmit">
          <p class="text-body-1 px-3">
            {{ $t('form.preamble') }}
          </p>
          <v-textarea
            v-model="form.message"
            outlined
            persistent-hint
            required
            class="my-3"
            :label="$t('form.message.label')"
            :hint="$t('form.message.hint')"
            :error-messages="validationErrors.form.message"
            placeholder=""
            rows="5"
          />
          <v-text-field
            v-model="form.url"
            name="url"
            outlined
            persistent-hint
            class="my-3"
            :label="$t('form.url.label')"
            :hint="$t('form.url.hint')"
            placeholder="https://"
          />
          <v-file-input
            v-model="file"
            :label="$t('form.attachment.label')"
            :placeholder="$t('form.attachment.placeholder')"
            prepend-icon="mdi-paperclip"
            :hint="$t('form.attachment.hint')"
            persistent-hint
            outlined
            class="my-3"
          />
          <v-divider class="mb-8" />
          <v-textarea
            v-model="form.comment"
            name="comment"
            outlined
            persistent-hint
            class="my-3"
            :label="$t('form.comment.label')"
            :hint="$t('form.comment.hint')"
          />
          <v-btn :loading="loading" color="primary" @click="onSubmit">
            {{ $t('form.submit.label') }}
          </v-btn>
          <v-btn :disabled="loading" @click="onReset">
            {{ $t('form.reset.label') }}
          </v-btn>
        </v-form>
      </div>
      <div v-else-if="page === pages.SIMILAR_TOPICS">
        <v-card-subtitle>
          <h4>
            {{ $tc('found_similar_topics', relatedReports.length) }}
          </h4>
        </v-card-subtitle>
        <report-card
          v-for="(report, i) in relatedReports"
          :key="i"
          :summary="report.summary"
          :explanation="report.explanation"
          :published-at="report.publishedAt"
          :conclusion="report.conclusion"
          embedded
          class="my-4"
        />
        <v-card-action>
          <v-form>
            <v-btn :loading="loading" color="primary" @click="onSubmitAnyway">
              {{ $t('form.submit_anyway.label') }}
            </v-btn>
            <v-btn :disabled="loading" @click="onGoBackToForm">
              {{ $t('form.go_back.label') }}
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
import ReportCard from '@/components/ReportCard.vue'
import { topicMarshaler } from '@/utils/marshalers.js'

const pages = {
  REPORT: Symbol('REPORT'),
  SIMILAR_TOPICS: Symbol('SIMILAR_TOPICS')
}

const defaultFormData = () => {
  return {
    message: '',
    url: '',
    comment: '',
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
    ReportCard
  },
  validations: {
    form: {
      message: { required, minLength: minLength(3) }
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
            message: this.form.message,
            url: this.form.url,
            comment: this.form.comment,
            attachments: this.form.attachments
          }
        }
      })
    },

    async upload() {
      const {
        data: { createAsset }
      } = await this.$apollo.mutate({
        mutation: gql`
          mutation createAsset($input: CreateAssetInput!) {
            createAsset(input: $input) {
              asset {
                id
                url
              }
              token
            }
          }
        `,
        variables: {
          input: {
            file: this.file
          }
        }
      })
      return createAsset
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
          query RelatedReports($originalMessage: String, $originalUrl: URL) {
            relatedReports: searchRelatedReports(
              originalMessage: $originalMessage
              originalUrl: $originalUrl
            ) {
              nodes {
                summary
                explanation
                publishedAt
                conclusion
                fullReportUrl
              }
            }
          }
        `,
        variables: {
          originalMessage: this.form.message,
          originalUrl: this.form.url
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
          text: this.$t('snackbar.error.content')
        }

        // eslint-disable-next-line no-console
        console.error(err)
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
          const { token } = await this.upload()
          this.form.attachments.push({
            assetToken: token
          })
        }
        await this.submit()
        this.$router.push(this.localePath({ name: 'embed-topics-thankyou' }))
      } catch (err) {
        this.snackbar = {
          show: true,
          text: this.$t('snackbar.error.content')
        }

        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    onGoBackToForm() {
      this.page = pages.REPORT
    }
  },
  head() {
    return { title: this.$t('title') }
  }
}
</script>
