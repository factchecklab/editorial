<i18n lang="yaml">
en:
  thankyou: We have received your fake news report. Thank you.
  buttons:
    again: Report again
    show_topics: Show topics
zh-hk:
  thankyou: 我們已經收到你回報的消息，謝謝。
  buttons:
    again: 再來一次
    show_topics: 查看主題
</i18n>

<template>
  <v-card class="col-lg-6 mx-auto" flat>
    <v-card-title>
      <h3>{{ $t('pages.reports.new.title') }}</h3>
    </v-card-title>
    <v-card-text>{{ $t('thankyou') }}</v-card-text>
    <v-card-actions>
      <v-btn text :to="localePath({ name: 'embed-reports-new' })" exact>
        {{ $t('buttons.again') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'embed'
}
</script>
