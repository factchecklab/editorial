<!--
SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <v-app>
    <v-content>
      <v-container ref="embedded-container" class="align-start" fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      height: 0
    }
  },
  watch: {
    height() {
      if (window.parent === window) return
      window.parent.postMessage(
        {
          type: 'maatUpdateHeight',
          data: {
            height: this.height
          }
        },
        '*'
      )
    }
  },
  mounted() {
    setInterval(() => {
      this.height = this.$refs['embedded-container'].clientHeight
    }, 50)
  }
}
</script>
