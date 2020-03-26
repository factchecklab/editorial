<template>
  <v-app>
    <app-bar />

    <v-content>
      <v-container class="fill-height align-start" fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/base/AppBar.vue'
export default {
  components: {
    AppBar
  },
  data: () => ({
    drawer: null
  })
}
</script>
