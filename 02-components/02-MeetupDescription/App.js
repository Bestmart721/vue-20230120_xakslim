import { defineComponent } from './vendor/vue.esm-browser.js';
import meetups from './api/meetups.js';
import MeetupDescription from './components/MeetupDescription.js';

export default defineComponent({
  name: 'App',

  components: {
    MeetupDescription,
  },

  data() {
    return {
      meetups,
      selectedMeetup: 0,
    };
  },

  computed: {
    description() {
      return this.meetups[this.selectedMeetup].description;
    },
  },

  template: `
    <div class="sample container meetup__content">
      <p>
        <select v-model="selectedMeetup">
          <option v-for="(meetup, index) in meetups" :key="meetup.id" :value="index">
            {{ index }}: {{ meetup.title }}
          </option>
        </select>
      </p>

      <h3>Описание</h3>

      <MeetupDescription :description="description" />
    </div>
  `,
});
