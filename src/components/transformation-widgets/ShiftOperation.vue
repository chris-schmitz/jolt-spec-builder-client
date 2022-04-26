<template>
  <!--  TODO replace with a contenteditable div -->
  <div class="block-wrapper">
    <h2>Shift</h2>
    <textarea
        :value="shiftInstructionsString"
        @input="saveContent"
    ></textarea>
    <label for="pass-along"
    >Pass along other data to next operation:
      <input
          type="checkbox"
          id="pass-along"
          v-model="passAlongOtherContent"
          @change="togglePassAlong"
      /></label>
  </div>
</template>

<script lang="ts">
import {JoltOperation, RenderComponentTypes} from '@/store/SpecStore';
import {defineComponent, reactive, toRefs} from "vue";


export default defineComponent({
  name: 'ShiftOperation',
  props: ['block', 'index'],
  setup() {
    const state = reactive({
      shiftInstructions: '',
      passAlongOtherContent: true,
    })
    return {...toRefs(state)}
  },
  computed: {
    shiftInstructionsString(): string {
      return JSON.stringify(this.shiftInstructions, null, 2);
    },
  },
  watch: {
    block: {
      immediate: true,
      handler(newValue) {
        this.shiftInstructions = newValue.spec;
        this.passAlongOtherContent = newValue.renderData.passAlong;
      },
    },
  },
  methods: {
    togglePassAlong() {
      const operation = this.formatShiftOperation(this.shiftInstructions);
      this.notifyOfBlockUpdate(operation);
    },
    // TODO: UUUUGH figure out the type for this DOM event !!!
    saveContent(event: any) {
      const operation = this.formatShiftOperation(
          JSON.parse(event.target.value)
      );
      this.notifyOfBlockUpdate(operation);
    },

    // TODO: move
    // * move out to the shift tools, but only once things fit together. Really
    // * stuff like intruducing typescript may resovle the need to move it, but even still
    // * it seems like a "group like business logic" move
    formatShiftOperation(shiftInstructions: any): JoltOperation {
      return {
        operation: 'shift',
        renderComponent: RenderComponentTypes.SHIFT,
        renderData: {
          passAlong: this.passAlongOtherContent,
        },
        spec: shiftInstructions,
      };
    },
    notifyOfBlockUpdate(operation: JoltOperation) {
      this.$emit('block-operation-updated', {
        index: this.index,
        operation,
      });
    },
  },
});
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