<!--
SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <v-card>
    <v-card-title class="subtitle-2 font-weight-light text--secondary">
      {{ title }}
    </v-card-title>
    <v-card-text
      class="spaces-preserving_card-text body-2 font-weight-regular text--primary"
    >
      {{ content }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.spaces-preserving_card-text {
  white-space: pre-line;
}
</style>
