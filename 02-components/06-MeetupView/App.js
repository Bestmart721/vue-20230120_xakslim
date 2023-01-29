import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupView from './components/MeetupView.js';
import meetups from './api/meetups.js';

export default defineComponent({
  name: 'App',

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: meetups[2],
    };
  },

  template: `
    <div class="page-meetup">
      <MeetupView :meetup="meetup" />
    </div>
  `,
});
