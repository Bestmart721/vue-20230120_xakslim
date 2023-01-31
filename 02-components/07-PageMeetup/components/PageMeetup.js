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
      hasError: false
    };
  },
  methods: {
    getMeetups() {
      this.loader = true;
      return fetchMeetupById(this.meetupId)
        .then((result) => {
          this.meetup = result;
        })
        .catch(error => {
          this.hasError = true;
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

    <UiContainer v-if="loader">
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>

    <UiContainer v-if="hasError">
      <UiAlert>error</UiAlert>
    </UiContainer>
    </div>
  `
});
