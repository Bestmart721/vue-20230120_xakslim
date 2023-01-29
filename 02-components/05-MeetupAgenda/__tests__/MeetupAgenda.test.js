jest.mock(global.getSolutionPath('vendor/vue.esm-browser.js'), () => require('vue'));

import { shallowMount } from '@vue/test-utils';
const { default: MeetupAgenda } = require(global.getSolutionPath('components/MeetupAgenda'));
const { default: MeetupAgendaItem } = require(global.getSolutionPath('components/MeetupAgendaItem'));
import meetups from './__fixtures__/meetups.json';

const meetup = meetups[0];
const emptyAgendaItem = {
  id: 0,
  startsAt: '00:00',
  endsAt: '00:00',
  type: 'other',
  title: null,
  description: null,
  speaker: null,
  language: null,
};

describe('components/MeetupAgenda', () => {
  describe('MeetupAgendaItem', () => {
    it('MeetupAgendaItem должен выводить правильную иконку в первом столбце .agenda-item__col для регистрации в соответствии с параметром agenda', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, { props: { agendaItem } });
      expect(wrapper.find('.agenda-item__col img').attributes('src')).toContain('cal-sm');
    });

    it('MeetupAgendaItem должен выводить время пункта программы во втором столбце .agenda-item__col в соответствии с параметром agenda', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, { props: { agendaItem } });
      expect(wrapper.find('.agenda-item__col:nth-child(2)').text()).toContain(
        `${agendaItem.startsAt} - ${agendaItem.endsAt}`,
      );
    });

    it('MeetupAgendaItem должен выводить заголовок в .agenda__title в соответствии с параметром agenda', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, { props: { agendaItem } });
      expect(wrapper.find('.agenda-item__title').text()).toContain(agendaItem.title);
    });

    it('MeetupAgendaItem должен выводить заголовок по умолчанию при отсутствии заголовка пункта программы в соответствии с параметром agenda', () => {
      const agendaItem = meetup.agenda[1];
      const wrapper = shallowMount(MeetupAgendaItem, { props: { agendaItem } });
      expect(wrapper.find('.agenda-item__title').text()).toContain('Регистрация');
    });

    it('MeetupAgendaItem должен выводить доклад в соответствии с параметром agenda', () => {
      const agendaItem = meetup.agenda[2];
      const wrapper = shallowMount(MeetupAgendaItem, {
        props: { agendaItem },
      });
      expect(wrapper.find('.agenda-item__col img').attributes('src')).toContain('tv');
      expect(wrapper.find('.agenda-item__title').text()).toContain(agendaItem.title);
      expect(wrapper.find('.agenda-item .agenda-item__col:nth-child(2)').text()).toContain(
        `${agendaItem.startsAt} - ${agendaItem.endsAt}`,
      );
      expect(wrapper.find('.agenda-item__talk span:nth-child(1)').text()).toContain(agendaItem.speaker);
      expect(wrapper.find('.agenda-item__lang').text()).toContain(agendaItem.language);
      expect(wrapper.find('.agenda-item__col:nth-child(3)').text()).toContain(agendaItem.description);
    });

    it('MeetupAgendaItem должен выводить правильную иконку в первом столбце .agenda-item__col для регистрации в соответствии с обновлённым параметром agenda', async () => {
      const wrapper = shallowMount(MeetupAgendaItem, { props: { agendaItem: emptyAgendaItem } });
      const agendaItem = meetup.agenda[0];
      await wrapper.setProps({ agendaItem });
      expect(wrapper.find('.agenda-item__col img').attributes('src')).toContain('cal-sm');
    });

    it('MeetupAgendaItem должен выводить время пункта программы во втором столбце .agenda-item__col в соответствии с обновлённым параметром agenda', async () => {
      const wrapper = shallowMount(MeetupAgendaItem, { props: { agendaItem: emptyAgendaItem } });
      const agendaItem = meetup.agenda[0];
      await wrapper.setProps({ agendaItem });
      expect(wrapper.find('.agenda-item__col:nth-child(2)').text()).toContain(
        `${agendaItem.startsAt} - ${agendaItem.endsAt}`,
      );
    });

    it('MeetupAgendaItem должен выводить заголовок в .agenda__title в соответствии с обновлённым параметром agenda', async () => {
      const wrapper = shallowMount(MeetupAgendaItem, { props: { agendaItem: emptyAgendaItem } });
      const agendaItem = meetup.agenda[0];
      await wrapper.setProps({ agendaItem });
      expect(wrapper.find('.agenda-item__title').text()).toContain(agendaItem.title);
    });

    it('MeetupAgendaItem должен выводить заголовок по умолчанию при отсутствии заголовка пункта программы в соответствии с обновлённым параметром agenda', async () => {
      const wrapper = shallowMount(MeetupAgendaItem, { props: { agendaItem: emptyAgendaItem } });
      const agendaItem = meetup.agenda[1];
      await wrapper.setProps({ agendaItem });
      expect(wrapper.find('.agenda-item__title').text()).toContain('Регистрация');
    });

    it('MeetupAgendaItem должен выводить доклад в соответствии с обновлённым параметром agenda', async () => {
      const wrapper = shallowMount(MeetupAgendaItem, {
        props: { agendaItem: emptyAgendaItem },
      });
      const agendaItem = meetup.agenda[2];
      await wrapper.setProps({ agendaItem });
      expect(wrapper.find('.agenda-item__col img').attributes('src')).toContain('tv');
      expect(wrapper.find('.agenda-item__title').text()).toContain(agendaItem.title);
      expect(wrapper.find('.agenda-item .agenda-item__col:nth-child(2)').text()).toContain(
        `${agendaItem.startsAt} - ${agendaItem.endsAt}`,
      );
      expect(wrapper.find('.agenda-item__talk span:nth-child(1)').text()).toContain(agendaItem.speaker);
      expect(wrapper.find('.agenda-item__lang').text()).toContain(agendaItem.language);
      expect(wrapper.find('.agenda-item__col:nth-child(3)').text()).toContain(agendaItem.description);
    });
  });

  describe('MeetupAgenda', () => {
    it('MeetupAgenda должен выводить программу через компоненты MeetupAgendaItem с параметром agendaItem', () => {
      const wrapper = shallowMount(MeetupAgenda, {
        props: { agenda: meetup.agenda },
      });
      const agendaItemsWrappers = wrapper.findAllComponents(MeetupAgendaItem);
      expect(agendaItemsWrappers).toHaveLength(meetup.agenda.length);
      for (let i = 0; i < agendaItemsWrappers.length; i++) {
        expect(agendaItemsWrappers[i].props('agendaItem')).toEqual(meetup.agenda[i]);
      }
    });
  });
});
