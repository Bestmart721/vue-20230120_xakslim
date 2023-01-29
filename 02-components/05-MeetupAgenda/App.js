import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgenda from './components/MeetupAgenda.js';
import MeetupAgendaItem from './components/MeetupAgendaItem.js';

export default defineComponent({
  name: 'App',

  components: {
    MeetupAgenda,
    MeetupAgendaItem,
  },

  data() {
    return {
      agenda: [
        {
          id: 35,
          startsAt: '07:30',
          endsAt: '09:00',
          type: 'registration',
          title: null,
          description: null,
          speaker: null,
          language: null,
        },
        {
          id: 36,
          startsAt: '09:00',
          endsAt: '09:30',
          type: 'opening',
          title: 'Opening Keynote with Evan',
          description: null,
          speaker: null,
          language: null,
        },
        {
          id: 37,
          startsAt: '09:40',
          endsAt: '10:10',
          type: 'talk',
          title: 'Get the most out of Vue Router',
          description:
            "Routers in Single page applications touch a broad part of our business logic. As a consequence, we often end up with different ways of handling the same pattern/UX/logic in our code and we often wonder which one is better and why. Different ways of handling data fetching that change the user experience, different ways to implement layouts, and many more. During this talk, I will cover very practical implementations that I have found useful in the past and explain the differences between various Vue Router features. After the talk you will have a better understanding of Vue Router's API and hopefully the excitement to refactor some bits of your Vue app!",
          speaker: 'Eduardo',
          language: 'EN',
        },
      ],
    };
  },

  template: `
    <div class="sample container">
      <h2>MeetupAgendaItem</h2>
      <h3>Регистрация</h3>
      <div>
        <MeetupAgendaItem :agenda-item="agenda[0]" />
      </div>
      <h3>Открытие (нестандартный заголовок)</h3>
      <div>
        <MeetupAgendaItem :agenda-item="agenda[1]" />
      </div>
      <h3>Доклад</h3>
      <div>
        <MeetupAgendaItem :agenda-item="agenda[2]" />
      </div>

      <h2>MeetupAgenda</h2>
      <MeetupAgenda :agenda="agenda" />
    </div>
  `,
});
