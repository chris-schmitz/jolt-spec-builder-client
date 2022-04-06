<template>
  <textarea v-text="block.document"></textarea>
</template>

<script>
export default {
  name: "RawJolt",
  props: ['block']
}
</script>

<style scoped>

</style>