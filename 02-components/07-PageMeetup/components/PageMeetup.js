import { defineComponent } from "../vendor/vue.esm-browser.js";
import UiContainer from "./UiContainer.js";
import UiAlert from "./UiAlert.js";
import { fetchMeetupById } from "../meetupService.js";
import MeetupView from "../../06-MeetupView/components/MeetupView";

export default defineComponent({
  name: "PageMeetup",
  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      meetup: null,
      loader: false,
      error: null,
    };
  },
  methods: {
    getMeetups() {
      this.loader = true;
      this.error = null;
      this.meetup = null;
      return fetchMeetupById(this.meetupId)
        .then((result) => {
          this.meetup = result;
        })
        .catch(error => {
          this.error = error.message;
        })
        .finally(() => {
          this.loader = false;
        });

    }
  },
  watch: {
    meetupId() {
      this.getMeetups()
    }
  },
  mounted() {
    this.getMeetups()
  },
  template: `
    <div class="page-meetup">
    <MeetupView :meetup="meetup" v-if="meetup" />
    <UiContainer v-if="error">
      <UiAlert>{{ error }}</UiAlert>
    </UiContainer>
    </div>

    <UiContainer v-if="loader">
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>
  `
});
