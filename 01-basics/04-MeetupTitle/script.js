import { createApp, defineComponent } from "./vendor/vue.esm-browser.js";

const API_URL = "https://course-vue.javascript.ru/api";

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const App = defineComponent({
  name: "App",
  data() {
    return {
      meetups: null,
      meetupId: null,
      meetupTitle: null,
    };
  },

  watch: {
    meetupId(value) {
      fetchMeetupById(value).then(response => {
        this.meetupTitle = response.title
      })
    },
  },

  template: `
    <div>
    <label><input type="radio" name="meetupId" v-model="meetupId" value="1" /> 1</label>
    <label><input type="radio" name="meetupId" v-model="meetupId" value="2" /> 2</label>
    <label><input type="radio" name="meetupId" v-model="meetupId" value="3" /> 3</label>
    <label><input type="radio" name="meetupId" v-model="meetupId" value="4" /> 4</label>
    <label><input type="radio" name="meetupId" v-model="meetupId" value="5" /> 5</label>

    <hr />

    <h3>{{ meetupTitle }}</h3>
    </div>`
});
const app = createApp(App);
const vm = app.mount("#app");
window.vm = vm;
