<!--
SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <v-card class="grey lighten-5">
    <nuxt-link
      v-if="!embedded"
      :to="localePath({ name: 'topics-id', params: { id } })"
    >
      <v-card-title>
        {{ summary }}
      </v-card-title>
    </nuxt-link>
    <div v-else>
      <v-card-title>{{ summary }}</v-card-title>
    </div>
    <v-card-subtitle>
      <v-chip outlined>
        <time-delta-display attribute="reported_at" :time="publishedAt" />
      </v-chip>
    </v-card-subtitle>
    <v-card-text class="spaces-preserving_card-text">
      {{ explanation }}
    </v-card-text>
    <v-card-actions v-if="!embedded">
      <slot name="actions">
        <v-btn text :to="localePath({ name: 'topics-id', params: { id } })">
          {{ $t('components.topic_card.buttons.view_topic_details') }}
        </v-btn>
      </slot>
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
    summary: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      required: true
    },
    publishedAt: {
      type: Date,
      required: true
    },
    embedded: {
      type: Boolean,
      default: false
    },
    conclusion: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.truthy::after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  right: 0px;
  top: 0px;
  background: linear-gradient(to left bottom, #28a745 49%, transparent 33%);
}

.falsy::after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  right: 0px;
  top: 0px;
  background: linear-gradient(to left bottom, #dc3545 49%, transparent 33%);
}

.uncertain::after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  right: 0px;
  top: 0px;
  background: linear-gradient(to left bottom, #6c757d 49%, transparent 33%);
}

.disputed::after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  right: 0px;
  top: 0px;
  background: linear-gradient(to left bottom, #ffc107 49%, transparent 33%);
}

.spaces-preserving_card-text {
  white-space: pre-line;
}
</style>
