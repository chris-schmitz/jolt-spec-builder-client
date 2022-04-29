<template>
  {{ block }}
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

const props = defineProps<{ block: object, index: number }>()


</script>

<style scoped>

</style>