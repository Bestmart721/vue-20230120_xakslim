import { shallowMount } from '@vue/test-utils';
const { default: MeetupDescription } = require(global.getSolutionPath('components/MeetupDescription'));
import meetups from './__fixtures__/meetups';

jest.mock(global.getSolutionPath('vendor/vue.esm-browser.js'), () => require('vue'));

describe('components/MeetupDescription', () => {
  describe('MeetupDescription', () => {
    it('MeetupDescription должен выводить описание митапа в соответствии с параметром description', () => {
      const wrapper = shallowMount(MeetupDescription, {
        props: { description: meetups[0].description },
      });
      expect(wrapper.text()).toContain(meetups[0].description);
    });

    it('MeetupDescription должен выводить описание митапа в соответствии с обновлённым параметром description', async () => {
      const wrapper = shallowMount(MeetupDescription, {
        props: { description: meetups[0].description },
      });
      await wrapper.setProps({ description: meetups[1].description });
      expect(wrapper.text()).toContain(meetups[1].description);
    });
  });
});
