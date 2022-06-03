import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import SpecSubmitter from "@/utilities/SpecSubmitter";

const app = createApp(App)
app.use(createPinia())

app.mount('#app')

// ! I hate this.
// TODO: figure out a better way of making this singleton accessible
// * The reason we're doing this is because the pinia instance used in the SpecSubmitter needs the main pinia instance created
// * and used by vue before we can create module stores. If we don't we get an error:
// | getActivePinia was called with no active Pinia. Did you forget to install pinia?
// * The SpecSubmitter module gets run before this main.ts file (somehow), so if we try to fire the `useSpecStore` function
// * at the root of the module we'll get the error. The two step solution is to wrap the methods in SpecSubmitter in a class with
// * the `useSpecStore` call in the constructor so that the call doesn't happen immediately as the file is being evaluated
// * (could do this outside of the class syntax, but I'm already using classes so it's the cleanest and most consistent way)
// * and then create a janky singleton instance that we can pass to the components that actually need it.
// * Note that the reason we're creating the singleton in main.ts is because if we create it in the SpecSubmitter module and return it
// * like you normally would for a node singleton we would just be back where we were with the constructor calling the useSpecStore function
// * before main.ts fires. The easiest way to get around this is to create the instance after we know that main.ts has for sure run and the
// * main instance of pinia has been created and then export the singleton to be used elsewhere. ugly and messy, but for a prototype it
// * just is what it is.
const specSubmitter = new SpecSubmitter()
export {specSubmitter}
