<template>
  <full-image :src="src" />
</template>

<script>
import FullImage from '@/components/base/FullImage.vue'

export default {
  components: {
    FullImage
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>
