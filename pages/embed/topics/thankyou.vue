<i18n lang="yaml">
en:
  thankyou: We have received your submission. Thank you.
  again: Report again
  title: Submit fake news
zh-HK:
  thankyou: 我們已經收到你回報的消息，謝謝。
  again: 再來一次
  title: 回報假消息
</i18n>

<template>
  <v-card class="col-lg-6 mx-auto" flat>
    <v-card-text>{{ $t('thankyou') }}</v-card-text>
    <v-card-actions>
      <v-btn text :to="localePath({ name: 'embed-topics-submit' })" exact>
        {{ $t('again') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'embed',
  head() {
    return { title: this.$t('title') }
  }
}
</script>
