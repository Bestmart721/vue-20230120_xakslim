import { defineComponent } from './vendor/vue.esm-browser.js';
import PageMeetup from './components/PageMeetup.js';

export default defineComponent({
  name: 'App',

  components: { PageMeetup },
  data() {
    return {
      meetupId: 1,
    };
  },

  template: `
    <div class="sample">
      <div class="container">
        <p>
          <select v-model="meetupId">
            <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
          </select>
        </p>
      </div>

      <PageMeetup :meetup-id="meetupId" />
    </div>
  `,
});
