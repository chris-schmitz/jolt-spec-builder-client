<template>
  <div class="block-menu">
    <h1>Block menu</h1>
    <div class="block-container">
      <button
          class="block"
          v-for="block in blocks"
          v-text="block.label"
          v-bind:key="block.type"
      ></button>
    </div>
  </div>

</template>

<script>
export default {
  name: "BlockMenu",
  data() {
    return {
      blocks: [
        {
          label: "Raw Jolt",
          type: "raw-jolt"
        },
        {
          label: "Default",
          type: "defaultr"
        },
        {
          label: "Shift",
          type: "shiftr"
        },
        {
          label: "Sort",
          type: "sortr"
        },
        {
          label: "Rename Column",
          type: "renamer"
        },
        {
          label: "Un-nest",
          type: "unnester"
        },
        {
          label: "Nest",
          type: "nestr"
        },
      ]
    }
  }
}
</script>

<style scoped>
.block-menu {
  /*flex: 1;*/
  display: flex;
  flex-direction: column;
  /*background: orangered;*/
  /*justify-content: space-around;*/
}

.block-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /*background: pink;*/
  flex: 1;
}

.block {
  /*border: 1px solid red;*/
  /*background: lightblue;*/
  flex: 0 0 80px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>