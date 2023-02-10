const UiDropdown = require(global.getSolutionPath('components/UiDropdown')).default;
import { mount } from '@vue/test-utils';
import UiIcon from '../components/UiIcon';

describe('vue-cli/UiDropdown1', () => {
  describe('UiDropdown', () => {
    const icon = 'key';
    const OPTIONS_WITH_ICON = [
      { value: '1', text: 'one' },
      { value: '2', text: 'two', icon: 'key' },
    ];
    const OPTIONS = [
      { value: '1', text: 'one' },
      { value: '2', text: 'two' },
    ];
    const NEW_OPTIONS = [
      { value: '1_new', text: 'one_new' },
      { value: '2_new', text: 'two_new' },
      { value: '3_new', text: 'three_new' },
    ];
    const TITLE = 'Some title';

    it('UiDropdown должен иметь текст в dropdown__toggle с заголовком из параметра title, когда никакой вариант не выбран', () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      expect(wrapper.get('.dropdown__toggle').text()).toBe(TITLE);
    });

    it('UiDropdown должен иметь текст в dropdown__toggle с текстом выбранного варианта в соответствии со значением модели', () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE, modelValue: OPTIONS[1].value },
      });
      expect(wrapper.get('.dropdown__toggle').text()).toBe(OPTIONS[1].text);
    });

    it('UiDropdown должен иметь текст в dropdown__toggle с текстом выбранного варианта в соответствии со значением модели после его обновления', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE, modelValue: OPTIONS[1].value },
      });
      await wrapper.setProps({ modelValue: OPTIONS[0].value });
      expect(wrapper.get('.dropdown__toggle').text()).toBe(OPTIONS[0].text);
    });

    it('UiDropdown должен иметь текст в dropdown__toggle с текстом выбранного варианта в соответствии со значением модели после обновления списка вариантов', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE, modelValue: OPTIONS[1].value },
      });
      await wrapper.setProps({ options: NEW_OPTIONS, modelValue: NEW_OPTIONS[2].value });
      expect(wrapper.get('.dropdown__toggle').text()).toBe(NEW_OPTIONS[2].text);
    });

    it('UiDropdown должен изначально рендерить, но скрывать список вариантов .dropdown__menu', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      expect(wrapper.get('.dropdown__menu').isVisible()).toBeFalsy();
    });

    it('UiDropdown должен показывать список вариантов .dropdown__menu после клика на .dropdown__toggle', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      const button = wrapper.get('.dropdown__toggle');
      await button.trigger('click');
      expect(wrapper.get('.dropdown__menu').isVisible()).toBeTruthy();
    });

    it('UiDropdown должен рендерить, но скрывать список вариантов .dropdown__menu после клика на .dropdown__toggle при раскрытом списке', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      const button = wrapper.get('.dropdown__toggle');
      await button.trigger('click');
      await button.trigger('click');
      expect(wrapper.get('.dropdown__menu').isVisible()).toBeFalsy();
    });

    it('UiDropdown должен список вариантов .dropdown__item в соответствии с параметром options', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      const optionButtons = wrapper.findAll('.dropdown__item');
      expect(optionButtons).toHaveLength(OPTIONS.length);
      for (let i = 0; i < OPTIONS.length; i++) {
        expect(optionButtons[i].text()).toBe(OPTIONS[i].text);
      }
    });

    it('UiDropdown должен порождать событие обновления модели c value выбранного варианта после выбора', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      await wrapper.get('.dropdown__toggle').trigger('click');
      await wrapper.get('.dropdown__item:nth-child(2)').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue').length).toBe(1);
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([OPTIONS[1].value]);
    });

    it('UiDropdown должен рендерить, но скрывать список вариантов .dropdown__menu после выбора варианта', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      await wrapper.get('.dropdown__toggle').trigger('click');
      await wrapper.get('.dropdown__item:nth-child(2)').trigger('click');
      expect(wrapper.get('.dropdown__menu').isVisible()).toBeFalsy();
    });

    it('UiDropdown должен рендерить основную кнопку .dropdown__toggle без класса dropdown__toggle_icon, если ни у одного варианта нет иконки (option.icon)', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE, modelValue: '2' },
      });
      expect(wrapper.get('.dropdown__toggle').classes('dropdown__toggle_icon')).toBeFalsy();
    });

    it('UiDropdown должен рендерить основную кнопку .dropdown__toggle с классом dropdown__toggle_icon, если хотя бы у одного варианта есть иконка (option.icon)', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS_WITH_ICON, title: TITLE },
      });
      expect(wrapper.get('.dropdown__toggle').classes('dropdown__toggle_icon')).toBeTruthy();
    });

    it('UiDropdown должен выводить иконку выбранного варианта в .dropdown__toggle компонентом UiIcon', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS_WITH_ICON, title: TITLE, modelValue: '2' },
      });
      expect(wrapper.findComponent(UiIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(UiIcon).props('icon')).toBe(icon);
    });

    it('UiDropdown должен выводить все варианты без класса dropdown__item_icon, если ни у одного варианта нет иконки (option.icon)', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      const items = wrapper.findAll('.dropdown__item');
      expect(items.some((wrapper) => wrapper.classes('dropdown__item_icon'))).toBeFalsy();
    });

    it('UiDropdown должен выводить все варианты с классом dropdown__item_icon, если хотя бы у одного варианта есть иконка (option.icon)', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS_WITH_ICON, title: TITLE },
      });
      const items = wrapper.findAll('.dropdown__item');
      expect(items.every((wrapper) => wrapper.classes('dropdown__item_icon'))).toBeTruthy();
    });

    it('UiDropdown должен выводить все варианты с классом dropdown__item_icon, если хотя бы у одного варианта есть иконка (option.icon) после обновления списка вариантов', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      await wrapper.setProps({ options: OPTIONS_WITH_ICON });
      const items = wrapper.findAll('.dropdown__item');
      expect(items.every((wrapper) => wrapper.classes('dropdown__item_icon'))).toBeTruthy();
    });

    // Раскомментируйте блок ниже, если решаете дополнительную часть задачи

    /*

    it('UiDropdown должен иметь <select> со списком вариантов <option> в соответствии с параметром options', () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE },
      });
      const select = wrapper.find('select');
      expect(select.exists()).toBeTruthy();
      const optionElements = select.findAll('option');
      const optionsValueAndText = optionElements.map((option) => ({
        text: option.text(),
        value: option.element.value,
      }));
      expect(optionsValueAndText).toMatchObject(OPTIONS);
    });

    it('UiDropdown должен иметь <select> со значением модели', () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE, modelValue: OPTIONS[1].value },
      });
      expect(wrapper.get('select').element.value).toBe(OPTIONS[1].value);
    });

    it('UiDropdown должен порождать событие обновления модели при обновлении значения на скрытом <select>', async () => {
      const wrapper = mount(UiDropdown, {
        props: { options: OPTIONS, title: TITLE, modelValue: OPTIONS[0].value },
      });
      const select = wrapper.get('select');
      await select.setValue(OPTIONS[1].value);
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue').length).toBe(1);
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([OPTIONS[1].value]);
    });

     */
  });
});
