<template>
  <div class="sample container">
    <MeetupsCalendar :meetups="meetups" />
  </div>
</template>

<script>
import MeetupsCalendar from './components/MeetupsCalendar.vue';

let dates = [];

// Генерация дат для митапов
// Для всех месяцев 2022 и 2023 годов
// 8 и 22 числа чётных месяцев
// 7 и 12 числа нечётных месяцев
for (const year of [2022, 2023]) {
  for (let month = 1; month <= 12; month += 1) {
    if (+month % 2 === 0) {
      dates.push(`${year}-${month.toString().padStart(2, '0')}-08T00:00:00.000Z`);
      dates.push(`${year}-${month.toString().padStart(2, '0')}-22T00:00:00.000Z`);
    } else {
      dates.push(`${year}-${month.toString().padStart(2, '0')}-07T00:00:00.000Z`);
      dates.push(`${year}-${month.toString().padStart(2, '0')}-12T00:00:00.000Z`);
      dates.push(`${year}-${month.toString().padStart(2, '0')}-12T00:00:00.000Z`);
    }
  }
}

const meetups = dates.map((dateISO, index) => {
  const date = new Date(dateISO);
  return {
    id: index,
    date: +date,
    title: `Meetup ${date.toLocaleDateString('en-EN', { day: '2-digit', month: 'short' })}`,
    // Для удобства отладки
    __dateForDebug: dateISO,
    // Остальные свойства опущены для упрощения отладки
  };
});

export default {
  name: 'App',

  components: { MeetupsCalendar },

  data() {
    return {
      meetups,
    };
  },
};
</script>

<style></style>
