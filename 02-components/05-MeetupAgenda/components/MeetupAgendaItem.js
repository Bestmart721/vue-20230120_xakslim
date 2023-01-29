import { defineComponent } from '../vendor/vue.esm-browser.js';
// import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img src="/assets/icons/icon-key.svg" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">00:00 - 00:00</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">Title</h3>
        <p class="agenda-item__talk">
          <span>Talk Speaker</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">EN</span>
        </p>
        <p>Description</p>
      </div>
    </div>`,
});
