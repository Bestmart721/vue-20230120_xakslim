import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupCover from './components/MeetupCover.js';

export default defineComponent({
  name: 'App',

  components: {
    MeetupCover,
  },

  data() {
    return {
      meetupWithImage: {
        title: 'VueConf US',
        image: 'https://course-vue.javascript.ru/api/images/5',
      },
      meetupWithoutImage: {
        title: 'Demo meetup',
        image: null,
      },
    };
  },

  template: `
    <div class="sample">
      <h1 class="my">С изображением</h1>
      <MeetupCover :title="meetupWithImage.title" :image="meetupWithImage.image" />

      <hr class="my" />

      <h1 class="my">Без изображения</h1>
      <MeetupCover :title="meetupWithoutImage.title" :image="meetupWithoutImage.image" />
    </div>
  `,
});
