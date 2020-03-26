<template>
  <v-card class="mx-auto" flat>
    <!-- Title -->
    <v-card-title class="my-3">
      <h3 class="display-3">
        {{ title }}
      </h3>
    </v-card-title>

    <!-- Chips -->
    <v-card-subtitle class="my-1">
      <topic-conclusion :conclusion="conclusion" />
      <v-chip outlined>
        <time-delta-display attribute="updated_at" :time="updatedAt" />
      </v-chip>
      <v-chip outlined>
        <time-delta-display attribute="reported_at" :time="createdAt" />
      </v-chip>
    </v-card-subtitle>

    <!-- Summary -->
    <v-card-subtitle v-if="summary" class="my-1">
      <h4 class="subtitle-1">
        {{ topic.summary }}
      </h4>
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="8" class="py-0">
          <!-- Original image for small screen (1 column layout) -->
          <topic-cover-image
            :src="coverImageUrl"
            class="d-flex d-sm-none my-5"
          />

          <!-- Responses -->
          <response-detail-card
            v-for="response in responses"
            :key="response.id"
            :title="
              $t(`pages.topics.id.descriptions.responses.${response.type}`, {
                name: response.entity.name
              })
            "
            :content="response.content"
            class="my-5"
          />
        </v-col>

        <v-col cols="12" sm="4" class="py-0">
          <!-- Original image for large screen (2 columns layout) -->
          <topic-cover-image
            :src="coverImageUrl"
            class="d-none d-sm-flex my-5"
          />
          <!-- Original message -->
          <message-detail-card
            :title="$t('pages.topics.id.descriptions.original_message')"
            :content="content"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import MessageDetailCard from '@/components/message/MessageDetailCard.vue'
import ResponseDetailCard from '@/components/message/ResponseDetailCard.vue'
import TimeDeltaDisplay from '@/components/TimeDeltaDisplay.vue'
import TopicConclusion from '@/components/topic/TopicConclusion.vue'
import TopicCoverImage from '@/components/topic/TopicCoverImage.vue'

export default {
  name: 'TopicDetailCard',
  components: {
    MessageDetailCard,
    ResponseDetailCard,
    TimeDeltaDisplay,
    TopicConclusion,
    TopicCoverImage
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    },
    conclusion: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    responses: {
      type: Array,
      required: true
    },
    coverImageUrl: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
/* Card title word-break bug https://github.com/vuetifyjs/vuetify/issues/9130 */
.v-card__text,
.v-card__title {
  word-break: normal;
}
</style>
