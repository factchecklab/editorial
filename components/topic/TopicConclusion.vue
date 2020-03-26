<template>
  <v-chip v-if="conclusion === 'truthy'" color="success">
    <v-icon>mdi-check</v-icon>
    <span>{{ $t('pages.topics.id.conclusion.truthy') }}</span>
  </v-chip>
  <v-chip v-else-if="conclusion === 'falsy'" color="error">
    <v-icon>mdi-close</v-icon>
    <span> {{ $t('pages.topics.id.conclusion.falsy') }}</span>
  </v-chip>
  <v-chip v-else-if="conclusion === 'uncertain'" color="info">
    <v-icon>mdi-comment-question</v-icon>
    <span>{{ $t('pages.topics.id.conclusion.uncertain') }}</span>
  </v-chip>
  <v-chip v-else-if="conclusion === 'disputed'" color="warning">
    <v-icon>mdi-comment-question</v-icon>
    <span>{{ $t('pages.topics.id.conclusion.disputed') }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    conclusion: {
      type: String,
      required: true
    }
  }
}
</script>
