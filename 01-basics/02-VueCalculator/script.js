import { createApp, defineComponent } from "./vendor/vue.esm-browser.js";

const App = defineComponent({
  name: "App",
  data() {
    return {
      op1: 0,
      op2: 0,
      operation: "sum",
    };
  },

  computed: {
    result() {
      let result = 0

      if (this.operation === "sum") {
        result = this.op1 + this.op2
      } else if (this.operation === "subtract") {
        result = this.op1 - this.op2
      }  else if (this.operation === "multiply") {
        result = this.op1 * this.op2
      }  else if (this.operation === "divide") {
        result = this.op1 / this.op2
      }
      return result
    },
  },

  template: `
    <div class="row">
    <div class="col">
      <input type="number" v-model="op1" />
    </div>

    <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
      <label><input type="radio" v-model="operation" name="operator" value="sum" /> ➕</label>
      <label><input type="radio" v-model="operation" name="operator" value="subtract" /> ➖</label>
      <label><input type="radio" v-model="operation" name="operator" value="multiply" /> ✖</label>
      <label><input type="radio" v-model="operation" name="operator" value="divide" /> ➗</label>
    </div>

    <div class="col">
      <input type="number" v-model="op2"/>
    </div>

    <div class="col">=</div>

    <output class="col">{{ result }}</output>
    </div>`
});

// Создаём новое приложение по корневому компоненту
const app = createApp(App);
const vm = app.mount("#app");

window.vm = vm;
