const TheToaster = require(global.getSolutionPath('components/TheToaster')).default;
const UiIcon = require('../components/UiIcon').default;
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

jest.useFakeTimers();

describe('vue-cli/TheToaster', () => {
  describe('TheToaster', () => {
    const MESSAGE = 'Sample Message';

    async function testToast({ method, icon, class: klass }) {
      const wrapper = mount(TheToaster);
      wrapper.vm[method](MESSAGE);
      await nextTick();
      const toast = wrapper.find('.toast');
      expect(toast.exists()).toBeTruthy();
      expect(toast.text()).toContain(MESSAGE);
      expect(toast.classes(klass)).toBeTruthy();
      const iconWrapper = wrapper.findComponent(UiIcon);
      expect(iconWrapper.exists()).toBeTruthy();
      expect(iconWrapper.props('icon')).toBe(icon);
    }

    it('TheToaster изначально не показывает ни одного тоста', async () => {
      const wrapper = mount(TheToaster);
      expect(wrapper.find('.toast').exists()).toBeFalsy();
    });

    it('TheToaster должен иметь методы success и error', async () => {
      const wrapper = mount(TheToaster);
      expect(wrapper.vm.success).toBeDefined();
      expect(wrapper.vm.error).toBeDefined();
    });

    it('TheToaster должен выводить success тост с сообщением после вызова метода success', async () => {
      await testToast({ method: 'success', icon: 'check-circle', class: 'toast_success' });
    });

    it('TheToaster должен выводить error тост с сообщением после вызова метода error', async () => {
      await testToast({ method: 'error', icon: 'alert-circle', class: 'toast_error' });
    });

    it('TheToaster должен выводить список тостов в порядке добавления', async () => {
      const wrapper = mount(TheToaster);
      const messages = ['success_1', 'success_2', 'error_1', 'success_3'];
      for (const message of messages) {
        const method = message.startsWith('success') ? 'success' : 'error';
        wrapper.vm[method](message);
      }
      await nextTick();
      const toasts = wrapper.findAll('.toast');
      expect(toasts).toHaveLength(messages.length);
      for (let i = 0; i < toasts.length; i++) {
        expect(toasts[i].text()).toContain(messages[i]);
      }
    });

    it('TheToaster должен удалять тост через 5 секунд после добавления', async () => {
      const wrapper = mount(TheToaster);

      // Первый тост добавляется в 0, должен удалиться в 5000
      wrapper.vm.success('Time_0');
      await nextTick();

      // Второй тост добавляется в 2500, должен удалиться в 7500
      jest.advanceTimersByTime(2500);
      wrapper.vm.success('Time_2500');
      await nextTick();

      // Третий тост добавляется в 3500, должен удалиться в 8500
      jest.advanceTimersByTime(1000);
      wrapper.vm.success('Time_3500');
      await nextTick();

      // Наступает 5100, должен удалиться первый тост
      jest.advanceTimersByTime(1600);
      await nextTick();

      let toasts = wrapper.findAll('.toast');
      expect(toasts).toHaveLength(2);
      expect(toasts[0].text()).toContain('Time_2500');
      expect(toasts[1].text()).toContain('Time_3500');

      // Наступает 7600, должен удалиться второй тост
      jest.advanceTimersByTime(2500);
      await nextTick();

      toasts = wrapper.findAll('.toast');
      expect(toasts).toHaveLength(1);
      expect(toasts[0].text()).toContain('Time_3500');

      // Наступает 8600, тостов больше нет
      jest.advanceTimersByTime(1000);
      await nextTick();

      toasts = wrapper.findAll('.toast');
      expect(toasts).toHaveLength(0);
    });
  });
});
