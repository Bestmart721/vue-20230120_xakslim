jest.mock(global.getSolutionPath('vendor/vue.esm-browser.js'), () => require('vue'));

import { shallowMount } from '@vue/test-utils';
const { default: MeetupInfo } = require(global.getSolutionPath('components/MeetupInfo'));
import meetups from './__fixtures__/meetups.json';

const { organizer, place, date } = meetups[1];
const { organizer: newOrganizer, place: newPlace, date: newDate } = meetups[2];

describe('components/MeetupInfo', () => {
  describe('MeetupInfo', () => {
    it('MeetupInfo должен выводить организатора митапа в первом элементе списка в соответствии с параметром organizer', () => {
      const wrapper = shallowMount(MeetupInfo, { props: { organizer, place, date } });

      expect(wrapper.find('li:nth-child(1)').text()).toContain(organizer);
    });

    it('MeetupInfo должен выводить место проведения митапа во втором элементе списка в соответствии с параметром place', () => {
      const wrapper = shallowMount(MeetupInfo, { props: { organizer, place, date } });

      expect(wrapper.find('li:nth-child(2)').text()).toContain(place);
    });

    it('MeetupInfo должен выводить дату проведения митапа в третьем элементе списка в элементе <time> в соответствии с параметром date', () => {
      const wrapper = shallowMount(MeetupInfo, { props: { organizer, place, date } });

      expect(wrapper.find('li:nth-child(3)').text()).toContain(
        new Date(date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
      expect(wrapper.find('li:nth-child(3) time').attributes('datetime')).toBe(
        new Date(date).toISOString().substr(0, 10),
      );
    });

    it('MeetupInfo должен выводить организатора митапа в первом элементе списка в соответствии с обновлённым параметром organizer', async () => {
      const wrapper = shallowMount(MeetupInfo, { props: { organizer, place, date } });
      await wrapper.setProps({ organizer: newOrganizer });
      expect(wrapper.find('li:nth-child(1)').text()).toContain(newOrganizer);
    });

    it('MeetupInfo должен выводить место проведения митапа во втором элементе списка в соответствии с обновлённым параметром place', async () => {
      const wrapper = shallowMount(MeetupInfo, { props: { organizer, place, date } });
      await wrapper.setProps({ place: newPlace });
      expect(wrapper.find('li:nth-child(2)').text()).toContain(newPlace);
    });

    it('MeetupInfo должен выводить дату проведения митапа в третьем элементе списка в элементе <time> в соответствии с обновлённым параметром date', async () => {
      const wrapper = shallowMount(MeetupInfo, { props: { organizer, place, date } });
      await wrapper.setProps({ date: newDate });
      expect(wrapper.find('li:nth-child(3)').text()).toContain(
        new Date(newDate).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
      expect(wrapper.find('li:nth-child(3) time').attributes('datetime')).toBe(
        new Date(newDate).toISOString().substr(0, 10),
      );
    });
  });
});
