<template>
  <!--  TODO replace with a contenteditable div -->
  <div class="block-wrapper">
    <h2>Shift</h2>
    <textarea :value="shiftInstructionsString" @input="saveContent"></textarea>
    <label for="pass-along">Pass along other data to next
      operation: <input type="checkbox" id="pass-along" v-model="passAlongOtherContent" @change="togglePassAlong"></label>
  </div>
</template>

<script>
export default {
  name: "ShiftOperation",
  props: ['block', 'index'],
  data() {
    return {
      shiftInstructions: "",
      passAlongOtherContent: true
    }
  },
  computed: {
    shiftInstructionsString() {
      const instructionsStripped = this.shiftInstructions
      delete instructionsStripped["@1"]
      delete instructionsStripped["@"]
      return JSON.stringify(instructionsStripped, null, 2)
    }
  },
  watch: {
    block: {
      immediate: true,
      handler(newValue) {
        this.shiftInstructions = newValue.spec
      }
    }
  },
  methods: {
    togglePassAlong() {
      const operation = this.formatShiftOperation(this.shiftInstructions)
      this.notifyOfBlockUpdate(operation)
    },
    saveContent(event) {
      const operation = this.formatShiftOperation(JSON.parse(event.target.value, null, 2))
      this.notifyOfBlockUpdate(operation)
    },
    formatShiftOperation(shiftInstructions) {
      const operation = {
        "operation": "shift",
        "blockType": "shift",
        "passAlong": this.passAlongOtherContent,
        "spec": shiftInstructions
      }

      return operation
    },
    notifyOfBlockUpdate(operation) {
      this.$emit("block-operation-updated", {index: this.index, operation})
    }
  }
}
</script>

<style scoped>
textarea {
  flex: 1;
}

.block-wrapper {
  height: 200px;
  /*width: 90%;*/
  display: flex;
  flex-direction: column;
}
</style>