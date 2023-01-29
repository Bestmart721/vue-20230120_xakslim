import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',

  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    incCounter() {
      this.counter++;
    },
  },
  template: `
    <button type="button" @click="incCounter">{{ counter }}</button>
  `,
});

const app = createApp(App);

const vm = app.mount('#app');
window.vm = vm;
