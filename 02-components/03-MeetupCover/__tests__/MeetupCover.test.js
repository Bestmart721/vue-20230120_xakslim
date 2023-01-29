import { shallowMount } from '@vue/test-utils';
const { default: MeetupCover } = require(global.getSolutionPath('components/MeetupCover'));
import meetups from './__fixtures__/meetups.json';

jest.mock(global.getSolutionPath('vendor/vue.esm-browser.js'), () => require('vue'));

const { title, image } = meetups[1];
const { title: newTitle, image: newImage } = meetups[2];

describe('components/MeetupCover', () => {
  describe('MeetupCover', () => {
    it('MeetupCover должен выводить название митапа в соответствии с параметром title', () => {
      const wrapper = shallowMount(MeetupCover, { props: { title } });
      expect(wrapper.text()).toContain(title);
    });

    it('MeetupCover должен выводить изображение митапа через CSS свойство --bg-url на meetup-cover в соответствии с параметром image', () => {
      const wrapper = shallowMount(MeetupCover, { props: { image } });
      expect(wrapper.find('.meetup-cover').attributes('style') ?? '').toContain(image);
    });

    it('MeetupCover не должен удалять изображение по умолчанию при отсутствии ссылки на изображение', () => {
      const wrapper = shallowMount(MeetupCover);
      expect(wrapper.find('.meetup-cover').attributes('style') ?? '').not.toContain('--bg-url');
    });

    it('MeetupCover должен выводить новое название митапа из параметра title при обновлении входного параметра', async () => {
      const wrapper = shallowMount(MeetupCover, { props: { title } });
      await wrapper.setProps({ title: newTitle });
      expect(wrapper.text()).toContain(newTitle);
    });

    it('MeetupCover должен выводить новое изображение из параметра image при обновлении входного параметра', async () => {
      const wrapper = shallowMount(MeetupCover, { props: { title } });
      await wrapper.setProps({ image: newImage });
      expect(wrapper.find('.meetup-cover').attributes('style') ?? '').toContain(newImage);
    });
  });
});
