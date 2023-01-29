jest.mock(global.getSolutionPath('vendor/vue.esm-browser.js'), () => require('vue'));
jest.mock('../meetupService');

const { default: PageMeetupTest } = require(global.getSolutionPath('components/PageMeetup'));
const meetupService = require(global.getSolutionPath('meetupService'));
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import meetups from './__fixtures__/meetups';

describe('components/PageMeetup', () => {
  describe('PageMeetup', () => {
    it('PageMeetup должен загружать данные при инициализации компонента функцией fetchMeetupById', async () => {
      const meetupId = meetups[0].id;
      jest.spyOn(meetupService, 'fetchMeetupById').mockResolvedValue(meetups[0]);
      const wrapper = mount(PageMeetupTest, { props: { meetupId }, global: { stubs: ['MeetupView'] } });
      expect(meetupService.fetchMeetupById).toHaveBeenCalledWith(meetupId);
    });

    it('PageMeetup должен выводить только текст "Загрузка..." во время загрузки данных', async () => {
      jest.spyOn(meetupService, 'fetchMeetupById').mockReturnValue(new Promise(() => {}));
      const wrapper = mount(PageMeetupTest, {
        props: { meetupId: meetups[0].id },
        global: { stubs: ['MeetupView'] },
      });
      await nextTick();
      expect(wrapper.text()).toBe('Загрузка...');
      expect(wrapper.findComponent({ name: 'MeetupView' }).exists()).toBeFalsy();
    });

    it('PageMeetup должен выводить данные митапа полученные через fetchMeetupById с помощью компонента MeetupView', async () => {
      const meetup = meetups[0];
      jest.spyOn(meetupService, 'fetchMeetupById').mockResolvedValue(meetup);
      const wrapper = mount(PageMeetupTest, {
        props: { meetupId: meetup.id },
        global: { stubs: ['MeetupView'] },
      });
      await flushPromises();
      const view = wrapper.findComponent({ name: 'MeetupView' });
      expect(meetupService.fetchMeetupById).toHaveBeenCalled();
      expect(view.exists()).toBe(true);
      expect(view.props('meetup')).toEqual(meetup);
    });

    it('PageMeetup должен выводить сообщение об ошибке при неуспешной загрузке данных', async () => {
      const meetup = meetups[0];
      const error = new Error('Test Error');
      jest.spyOn(meetupService, 'fetchMeetupById').mockRejectedValue(error);
      const wrapper = mount(PageMeetupTest, { props: { meetupId: meetup.id }, global: { stubs: ['MeetupView'] } });
      await flushPromises();
      const view = wrapper.findComponent({ name: 'MeetupView' });
      expect(meetupService.fetchMeetupById).toHaveBeenCalled();
      expect(view.exists()).toBe(false);
      expect(wrapper.text()).toBe(error.message);
    });

    it('PageMeetup должен загружать новые данные через fetchMeetupById при обновлении параметра meetupId', async () => {
      let meetup = meetups[0];
      jest.spyOn(meetupService, 'fetchMeetupById').mockResolvedValue(meetup);
      const wrapper = mount(PageMeetupTest, {
        props: { meetupId: meetup.id },
        global: { stubs: ['MeetupView'] },
      });
      await flushPromises();

      meetup = meetups[1];
      jest.spyOn(meetupService, 'fetchMeetupById').mockResolvedValue(meetup);
      await wrapper.setProps({ meetupId: meetup.id });

      expect(meetupService.fetchMeetupById).toHaveBeenLastCalledWith(meetup.id);
      expect(wrapper.text()).toBe('Загрузка...');
      expect(wrapper.findComponent({ name: 'MeetupView' }).exists()).toBeFalsy();
    });

    it('PageMeetup должен выводить новые данные с MeetupView, полученные через fetchMeetupById, при обновлении параметра meetupId', async () => {
      let meetup = meetups[0];
      jest.spyOn(meetupService, 'fetchMeetupById').mockResolvedValue(meetup);
      const wrapper = mount(PageMeetupTest, {
        props: { meetupId: meetup.id },
        global: { stubs: ['MeetupView'] },
      });
      await flushPromises();

      meetup = meetups[1];
      jest.spyOn(meetupService, 'fetchMeetupById').mockResolvedValue(meetup);
      await wrapper.setProps({ meetupId: meetup.id });
      await flushPromises();

      const view = wrapper.findComponent({ name: 'MeetupView' });
      expect(view.exists()).toBe(true);
      expect(view.props('meetup')).toEqual(meetup);
    });
  });
});
