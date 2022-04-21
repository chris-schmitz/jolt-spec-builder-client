import {reactive} from 'vue'

const store = reactive({
  specBlocks: []
})
window.store = store

export default store