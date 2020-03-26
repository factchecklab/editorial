<template>
  <v-card :raised="selected" class="grey lighten-5">
    <v-card-text class="spaces-preserving_card-text">
      {{ content }}
    </v-card-text>
    <div v-if="matchedTopic">
      <v-card-subtitle class="subtitle-1 pb-0">
        {{ $t('components.report_card.descriptions.matched_topics') }}
      </v-card-subtitle>
      <v-card-text class="py-0">
        <v-list dense class="py-0 grey lighten-5">
          <v-list-item>
            <v-list-item-content>
              <nuxt-link
                :to="
                  localePath({
                    name: 'topics-id',
                    params: { id: matchedTopic.id }
                  })
                "
              >
                {{ matchedTopic.title }}
              </nuxt-link>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn text @click="$emit('unmatch', reportId)">
                {{ $t('components.report_card.buttons.unmatch_topic') }}
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card-text>
    </div>
    <div v-else-if="similarTopics.length > 0">
      <v-card-subtitle class="subtitle-1 pb-0">
        {{ $t('components.report_card.descriptions.similar_topics') }}
      </v-card-subtitle>
      <v-card-text class="py-0">
        <v-list dense class="py-0 grey lighten-5">
          <v-list-item v-for="topic in similarTopics" :key="topic.id">
            <v-list-item-content>
              <nuxt-link
                :to="
                  localePath({
                    name: 'topics-id',
                    params: { id: topic.id }
                  })
                "
              >
                {{ topic.title }}
              </nuxt-link>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn
                text
                class="float-right"
                @click="$emit('match', reportId, topic.id)"
              >
                {{ $t('components.report_card.buttons.match_topic') }}
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card-text>
    </div>
    <v-card-text>
      <v-chip outlined>
        <time-delta-display attribute="reported_at" :time="createdAt" />
      </v-chip>
    </v-card-text>
    <v-card-text v-if="attachments.length > 0">
      <a :href="attachments[0].asset.downloadUrl">Attachment Available</a>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="!selected" text @click="$emit('toggle')">
        {{ $t('components.report_card.buttons.select') }}
      </v-btn>
      <v-btn v-else text @click="$emit('toggle')">
        {{ $t('components.report_card.buttons.unselect') }}
      </v-btn>
      <v-btn v-if="!closed" text @click="$emit('close')">
        {{ $t('components.report_card.buttons.close') }}
      </v-btn>
      <v-btn v-else text @click="$emit('reopen')">
        {{ $t('components.report_card.buttons.reopen') }}
      </v-btn>
      <v-btn v-if="!matchedTopic" text @click="$emit('newTopic')">
        {{ $t('components.report_card.buttons.new_topic') }}
      </v-btn>
      <v-btn v-if="!matchedTopic" text @click="$emit('startMatch')">
        {{ $t('components.report_card.buttons.match_topic') }}
      </v-btn>
      <v-btn text @click="$emit('searchSimilar')">
        {{ $t('components.report_card.buttons.find_similar_reports') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TimeDeltaDisplay from '@/components/TimeDeltaDisplay.vue'

export default {
  components: {
    TimeDeltaDisplay
  },
  props: {
    reportId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    closed: {
      type: Boolean,
      required: true
    },
    similarTopics: {
      type: Array,
      default: () => {
        return []
      }
    },
    matchedTopic: {
      type: Object,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    },
    attachments: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style>
.spaces-preserving_card-text {
  white-space: pre-line;
}
</style>
