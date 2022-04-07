<template>
  <!--  TODO replace with a contenteditable div -->
  <textarea :value="JSON.stringify(block,null, 2)"></textarea>
  <!--  <p v-text="block"></p>-->
</template>

<script>
export default {
  name: "RawJolt",
  props: ['block']
}
</script>

<style scoped>

</style>