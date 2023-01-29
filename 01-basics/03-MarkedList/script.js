import { createApp, defineComponent } from "./vendor/vue.esm-browser.js";

const emails = [
  "Eliseo@gardner.biz",
  "Jayne_Kuhic@sydney.com",
  "Nikita@garfield.biz",
  "Lew@alysha.tv",
  "Hayden@althea.biz",
  "Presley.Mueller@myrl.com",
  "Dallas@ole.me",
  "Mallory_Kunze@marie.org",
  "Meghan_Littel@rene.us",
  "Carmen_Keeling@caroline.name",
  "Veronica_Goodwin@timmothy.net",
  "Oswald.Vandervort@leanne.org",
  "Kariane@jadyn.tv",
  "Nathan@solon.io",
  "Maynard.Hodkiewicz@roberta.com",
  "Christine@ayana.info",
  "Preston_Hudson@blaise.tv",
  "Vincenza_Klocko@albertha.name",
  "Madelynn.Gorczany@darion.biz",
  "Mariana_Orn@preston.org",
  "Noemie@marques.me",
  "Khalil@emile.co.uk",
  "Sophia@arianna.co.uk",
  "Jeffery@juwan.us",
  "Isaias_Kuhic@jarrett.net"
];

const App = defineComponent({
  name: "App",
  data() {
    return {
      emails: null,
      search: null
    };
  },

  computed: {
    inSearch() {
      return this.emails.map(item => {
        return { email: item, marked: this.search ? item.includes(this.search) : false };
      });
    }
  },

  created() {
    this.emails = emails;
  },

  methods: {
    formatAsLocalDate(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },

    formatAsIsoDate(timestamp) {
      return new Date(timestamp).toISOString().split("T")[0];
    }
  },


  template: `
    <div class="container">
    <div class="form-group">
      <input type="search" v-model="search" />
    </div>
    <ul>
      <li v-for="item in inSearch" :class="{marked: item.marked}">{{ item.email }}</li>
    </ul>
    </div>
  `
});

const app = createApp(App);
const vm = app.mount("#app");
window.vm = vm;
