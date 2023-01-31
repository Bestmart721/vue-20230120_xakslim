import { shallowMount } from '@vue/test-utils';
const { default: MeetupCover } = require(global.getSolutionPath('components/MeetupCover'));
import meetups from './__fixtures__/meetups.json';
import fs from 'fs/promises';
import path from 'path';

const { title, image } = meetups[1];

describe('sfc/VBindCover', () => {
  describe('MeetupCover', () => {
    it('MeetupCover должен выводить название митапа в соответствии с параметром title', () => {
      const wrapper = shallowMount(MeetupCover, { props: { title } });
      expect(wrapper.text()).toContain(title);
    });

    it('MeetupCover не должен иметь атрибута style без установленного значения параметра image', () => {
      const wrapper = shallowMount(MeetupCover);
      expect(wrapper.find('.meetup-cover').attributes('style')).toBeFalsy();
    });

    it('MeetupCover не должен иметь атрибута style при наличии изображения в параметре image', () => {
      const wrapper = shallowMount(MeetupCover, { props: { image } });
      expect(wrapper.find('.meetup-cover').attributes('style')).toBeFalsy();
    });

    it('Исходный код MeetupCover в блоке style должен включать v-bind', async () => {
      const solutionText = await fs.readFile(
        path.join(__dirname, global.getSolutionPath('components/MeetupCover.vue')),
        'utf8',
      );
      expect(solutionText).toMatch(/<style.*>.*v-bind.*<\/style>/ms);
    });
  });
});
