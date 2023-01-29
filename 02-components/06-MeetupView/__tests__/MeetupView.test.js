jest.mock(global.getSolutionPath('vendor/vue.esm-browser.js'), () => require('vue'));

const { default: MeetupView } = require(global.getSolutionPath('components/MeetupView'));
const { default: UiContainer } = require(global.getSolutionPath('components/UiContainer'));
const { default: UiAlert } = require(global.getSolutionPath('components/UiAlert'));
import { shallowMount } from '@vue/test-utils';
import meetups from './__fixtures__/meetups.json';

describe('components/MeetupView', () => {
  describe('MeetupView', () => {
    const meetup = meetups[0];
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMount(MeetupView, {
        props: { meetup },
        global: {
          stubs: { UiContainer, UiAlert },
        },
      });
    });

    it('MeetupView должен выводить изображение и заголовок митапа с MeetupCover', () => {
      const cover = wrapper.findComponent({ name: 'MeetupCover' });
      expect(cover.exists()).toBeTruthy();
      expect(cover.props('title')).toBe(meetup.title);
      expect(cover.props('image')).toBe(meetup.image);
    });

    it('MeetupView должен выводить описание митапа с MeetupDescription', () => {
      const description = wrapper.findComponent({ name: 'MeetupDescription' });
      expect(description.exists()).toBeTruthy();
      expect(description.props('description')).toBe(meetup.description);
    });

    it('MeetupView должен выводить краткую информацию митапа с MeetupInfo', () => {
      const info = wrapper.findComponent({ name: 'MeetupInfo' });
      expect(info.exists()).toBeTruthy();
      expect(info.props('organizer')).toBe(meetup.organizer);
      expect(info.props('place')).toBe(meetup.place);
      expect(info.props('date')).toBe(meetup.date);
    });

    it('MeetupView должен выводить программу митапа с MeetupAgenda', () => {
      const agenda = wrapper.findComponent({ name: 'MeetupAgenda' });
      expect(agenda.exists()).toBeTruthy();
      expect(agenda.props('agenda')).toEqual(meetup.agenda);
    });

    it('MeetupView не должен выводить UiAlert, если в параметре meetup непустая программа agenda', () => {
      const uiAlert = wrapper.findComponent({ name: 'UiAlert' });
      expect(uiAlert.exists()).toBeFalsy();
    });

    it('MeetupView должен выводить UiAlert, если в параметре meetup пустая программа agenda', async () => {
      await wrapper.setProps({ meetup: { ...meetup, agenda: [] } });
      const uiAlert = wrapper.findComponent({ name: 'UiAlert' });
      const agenda = wrapper.findComponent({ name: 'MeetupAgenda' });
      expect(uiAlert.exists()).toBeTruthy();
      expect(agenda.exists()).toBeFalsy();
    });
  });
});
