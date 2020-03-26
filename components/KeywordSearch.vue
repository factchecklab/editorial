<i18n lang="yaml">
en:
  labels:
    placeholder: Search...
  buttons:
    search: Search
zh-hk:
  labels:
    placeholder: 搜尋...
  buttons:
    search: 搜尋
</i18n>

<template>
  <v-form @submit.prevent="search">
    <v-text-field
      :value="value"
      class="mr-2 d-sm-inline-flex"
      clearable
      :placeholder="placeholderText || $t('labels.placeholder')"
      @input="$emit('input', $event)"
      @click:clear="clear"
    />
    <v-btn type="submit">
      {{ buttonText || $t('buttons.search') }}
    </v-btn>
    <slot />
  </v-form>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: ''
    },
    placeholderText: {
      type: String,
      default: ''
    }
  },
  methods: {
    clear(event) {
      this.$emit('input', '')
      this.$emit('search')
    },
    search(event) {
      this.$emit('search')
    }
  }
}
</script>
