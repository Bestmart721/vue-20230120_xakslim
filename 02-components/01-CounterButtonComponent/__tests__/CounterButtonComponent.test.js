const { shallowMount } = require('@vue/test-utils');
const { default: CounterButton } = require(global.getSolutionPath('CounterButton'));

jest.mock(global.getSolutionPath('vendor/vue.esm-browser.js'), () => require('vue'));

describe('components/CounterButtonComponent', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('CounterButton', () => {
    it('CounterButton должен иметь входной параметр count', () => {
      const wrapper = shallowMount(CounterButton);

      expect(wrapper.vm.$options.props.count).toBeTruthy();
    });

    it('CounterButton должен рендерить кнопку с текстом count', () => {
      const COUNT = 42;
      const wrapper = shallowMount(CounterButton, {
        props: { count: COUNT },
      });
      const button = wrapper.find('button');

      expect(button.exists()).toBe(true);
      expect(button.text()).toBe(COUNT.toString());
    });

    it('CounterButton должен рендерить кнопку с текстом 0 по умолчанию', () => {
      const wrapper = shallowMount(CounterButton);

      expect(wrapper.text()).toBe('0');
    });

    it('CounterButton должен порождать событие update:count с увеличенным на 1 значением по клику на кнопку', async () => {
      const COUNT = 1;
      const wrapper = shallowMount(CounterButton, {
        props: { count: COUNT },
      });
      const button = wrapper.find('button');

      await button.trigger('click');

      expect(wrapper.emitted('update:count')).toBeTruthy();
      expect(wrapper.emitted('update:count').length).toBe(1);
      expect(wrapper.emitted('update:count')[0]).toEqual([COUNT + 1]);
    });

    it('CounterButton должен обновлять текст на кнопке при обновлении входного параметра', async () => {
      const INITIAL_COUNT = 1;
      const NEW_COUNT = 100;
      const wrapper = shallowMount(CounterButton, {
        props: { count: INITIAL_COUNT },
      });

      await wrapper.setProps({ count: NEW_COUNT });

      expect(wrapper.text()).toBe(NEW_COUNT.toString());
    });

    it('CounterButton должен порождать событие update:count с увеличенным на 1 значением по клику после обновления входного параметра', async () => {
      const INITIAL_COUNT = 1;
      const NEW_COUNT = 100;
      const wrapper = shallowMount(CounterButton, {
        props: { count: INITIAL_COUNT },
      });
      const button = wrapper.find('button');

      await wrapper.setProps({ count: NEW_COUNT });
      await button.trigger('click');

      expect(wrapper.emitted('update:count')).toBeTruthy();
      expect(wrapper.emitted('update:count').length).toBe(1);
      expect(wrapper.emitted('update:count')[0]).toEqual([NEW_COUNT + 1]);
    });
  });
});
