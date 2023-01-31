import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      type: Object,
      required: true
    },
  },
  computed: {
    getIconKey() {
      return agendaItemIcons[this.agendaItem.type]
    },
    agendaIcon() {
      return `/assets/icons/icon-${this.getIconKey}.svg`
    },
    agendaTime() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`
    },
    agendaTitle() {
      return this.agendaItem.title || agendaItemDefaultTitles[this.agendaItem.type]
    }
  },


  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="agendaIcon" class="icon" :alt="getIconKey" />
      </div>
      <div class="agenda-item__col">{{ agendaTime }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaTitle }}</h3>
        <p class="agenda-item__talk" v-if="agendaItem.speaker || agendaItem.language">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
