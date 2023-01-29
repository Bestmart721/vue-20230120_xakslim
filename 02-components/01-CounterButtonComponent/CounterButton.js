import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Теперь текущее значение счётчика приходит от родителя через входной параметр
  props: {
    count: {
      // Не забываем указать тип
      type: Number,
      // Значение по умолчанию - 0
      default: 0,
    },
  },

  emits: ['update:count'],

  methods: {
    increment() {
      // При клике на кнопку порождаем событие и отправляем новое значение
      this.$emit('update:count', this.count + 1);
    },
  },

  template: `<button type="button" @click="increment">{{ count }}</button>`,
});
