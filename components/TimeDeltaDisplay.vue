<i18n lang="yaml">
en:
  time:
    created_at: "Created {deltaTime}"
    updated_at: "Updated {deltaTime}"
    reported_at: "Reported {deltaTime}"
zh-HK:
  time:
    created_at: "於{deltaTime}建立"
    updated_at: "於{deltaTime}更新"
    reported_at: "於{deltaTime}報告"
</i18n>

<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <span v-on="on">{{ deltaTime }}</span>
    </template>
    <span>{{ tooltipTime }}</span>
  </v-tooltip>
</template>

<script>
import moment from 'moment'
import { crossLanguageInterpolate } from '@/utils/i18n'

export default {
  props: {
    attribute: {
      type: String,
      default: ''
    },
    time: {
      type: Date,
      required: true
    }
  },
  computed: {
    deltaTime() {
      const deltaTime = moment(this.time)
        .locale(this.$i18n.locale)
        .fromNow()
      if (this.attribute) {
        return this.$t(`time.${this.attribute}`, {
          deltaTime: crossLanguageInterpolate(deltaTime, this.$i18n.locale)
        })
      } else {
        return deltaTime
      }
    },
    tooltipTime() {
      return moment(this.time)
        .locale(this.$i18n.locale)
        .format('YYYY-MM-DD hh:mm:ss a')
    }
  }
}
</script>
