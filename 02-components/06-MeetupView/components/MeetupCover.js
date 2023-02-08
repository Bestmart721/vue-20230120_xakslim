import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
    }
  },
  computed: {
    imageUrl() {
      return this.image ? '--bg-url: url(' + this.image +')' : ''
    }
  },

  template: `
    <div class="meetup-cover" :style="imageUrl">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
