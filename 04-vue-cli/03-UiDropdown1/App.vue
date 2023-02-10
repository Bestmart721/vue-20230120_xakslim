<template>
  <div class="sample container">
    <h2>With icons</h2>
    <p>selectedType = {{ selectedType }}</p>
    <p><button @click="selectedType = 'registration'">Set registration</button></p>
    <p><button @click="updateOptions">Remove last option</button></p>
    <p>
      <ui-dropdown v-model="selectedType" :options="agendaItemTypes" title="Событие" />
    </p>

    <h2>Without icons</h2>
    <p>selectedLang = {{ selectedLang }}</p>
    <p>
      <ui-dropdown v-model="selectedLang" :options="langOptions" title="Язык" />
    </p>

    <h2>Mixed icons</h2>
    <ui-dropdown v-model="selectedMixed" :options="mixedIconsOptions" title="Mixed icons" />
    <p></p>
  </div>
</template>

<script>
import UiDropdown from './components/UiDropdown.vue';

const agendaIconMap = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemTypes = [
  {
    value: 'registration',
    text: 'Регистрация',
  },
  {
    value: 'opening',
    text: 'Открытие',
  },
  {
    value: 'break',
    text: 'Перерыв',
  },
  {
    value: 'coffee',
    text: 'Coffee Break',
  },
  {
    value: 'closing',
    text: 'Закрытие',
  },
  {
    value: 'afterparty',
    text: 'Afterparty',
  },
  {
    value: 'talk',
    text: 'Доклад',
  },
  {
    value: 'other',
    text: 'Другое',
  },
].map((item) => ({
  ...item,
  icon: agendaIconMap[item.value],
}));

export default {
  name: 'App',
  components: { UiDropdown },
  data() {
    return {
      agendaItemTypes,

      langOptions: [
        { value: 'EN', text: 'EN' },
        { value: 'RU', text: 'RU' },
      ],

      mixedIconsOptions: [
        { value: 'with-icon', text: 'With icon', icon: 'tv' },
        { value: 'without-icon', text: 'Without icon' },
      ],

      selectedLang: 'EN',
      selectedType: undefined,
      selectedMixed: undefined,
    };
  },

  methods: {
    updateOptions() {
      this.agendaItemTypes.pop();
    },
  },
};
</script>

<style></style>
