const { shallowMount } = require('@vue/test-utils');
const { default: UiFormGroup } = require(global.getSolutionPath('components/UiFormGroup'));

describe('vue-cli/UiFormGroup1', () => {
  describe('UiFormGroup', () => {
    const slots = { default: '<div class="test-div">TEST_DIV_CONTENT</div>' };
    const LABEL = 'Test Label Text';

    it('UiFormGroup не должен иметь класс form-group_inline по умолчанию', async () => {
      const wrapper = shallowMount(UiFormGroup);
      expect(wrapper.classes('form-group_inline')).toBeFalsy();
    });

    it('UiFormGroup не должен иметь класс form-group_inline при ложном параметре inline', async () => {
      const wrapper = shallowMount(UiFormGroup, { props: { inline: false } });
      expect(wrapper.classes('form-group_inline')).toBeFalsy();
    });

    it('UiFormGroup должен иметь класс form-group_inline при истинном параметре inline', async () => {
      const wrapper = shallowMount(UiFormGroup, { props: { inline: true } });
      expect(wrapper.classes('form-group_inline')).toBeTruthy();
    });

    it('UiFormGroup не должен добавлять класс form-group_inline при обновлении параметра inline на истинное значение', async () => {
      const wrapper = shallowMount(UiFormGroup, { props: { inline: false } });
      await wrapper.setProps({ inline: true });
      expect(wrapper.classes('form-group_inline')).toBeTruthy();
    });

    it('UiFormGroup не должен выводить <label> по умолчанию', async () => {
      const wrapper = shallowMount(UiFormGroup, { slots });
      expect(wrapper.find('label').exists()).toBeFalsy();
    });

    it('UiFormGroup не должен выводить <label> с пустым значением параметра label', async () => {
      const wrapper = shallowMount(UiFormGroup, { props: { label: '' }, slots });
      expect(wrapper.find('label').exists()).toBeFalsy();
    });

    it('UiFormGroup должен выводить <label> с текстом из параметра label', async () => {
      const wrapper = shallowMount(UiFormGroup, { props: { label: LABEL } });
      const label = wrapper.find('label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toContain(LABEL);
    });

    it('UiFormGroup должен выводить содержимое слота по умолчанию', async () => {
      const wrapper = shallowMount(UiFormGroup, { slots });
      expect(wrapper.html()).toContain(slots.default);
    });
  });
});
