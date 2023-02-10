const { default: MeetupsCalendar } = require(global.getSolutionPath('./components/MeetupsCalendar'));
import { mount } from '@vue/test-utils';
import { advanceTo } from 'jest-date-mock';

const CELL_INACTIVE_CLASS = 'calendar-view__cell_inactive';

const SELECTOR_DATE = '.calendar-view__date';
const SELECTOR_CELL = '.calendar-view__cell';
const SELECTOR_CELL_DATE = '.calendar-view__cell-day';
const SELECTOR_PREV_MONTH = '[aria-label="Previous month"]';
const SELECTOR_NEXT_MONTH = '[aria-label="Next month"]';
const SELECTOR_EVENT = '.calendar-event';

function testDaysCount(cells, daysBefore, daysIn, daysAfter) {
  expect(cells.length).toBe(daysBefore.length + daysIn + daysAfter.length);
}

function testCellsInactive(cells, daysBefore, daysIn, daysAfter) {
  const expectedInactive = [...Array(daysBefore.length).fill(true)]
    .concat(Array(daysIn).fill(false))
    .concat(Array(daysAfter.length).fill(true));
  const cellsHasInactive = cells.map((cell) => cell.classes(CELL_INACTIVE_CLASS));
  expect(cellsHasInactive).toEqual(expectedInactive);
}

function testCellsText(cells, daysBefore, daysIn, daysAfter) {
  const expectedTextInCells = daysBefore
    .concat([...Array(daysIn).keys()].map((x) => (x + 1).toString()))
    .concat(daysAfter);
  const cellsTexts = cells.map((cell) => cell.text());
  expect(cellsTexts).toEqual(expectedTextInCells);
}

function testMonthTitle(title, _date) {
  const date = new Date(_date);
  const expected = date.toLocaleDateString(navigator.language, {
    month: 'long',
    year: 'numeric',
  });
  expect(title).toBe(expected);
}

function testMonthCalendar(wrapper, expectedDate, daysBefore, daysIn, daysAfter) {
  const cells = wrapper.findAll(SELECTOR_CELL);
  testDaysCount(cells, daysBefore, daysIn, daysAfter);
  testCellsInactive(cells, daysBefore, daysIn, daysAfter);
  testCellsText(cells, daysBefore, daysIn, daysAfter);

  const title = wrapper.get(SELECTOR_DATE).text();
  testMonthTitle(title, expectedDate);
}

function mountMeetupsCalendar(meetups = []) {
  return mount(MeetupsCalendar, {
    props: {
      meetups,
    },
  });
}

describe('vue-cli/MeetupsCalendar', () => {
  describe('MeetupsCalendar', () => {
    it('MeetupsCalendar должен локализовано месяц и год в заголовке для ноября 2022', () => {
      advanceTo(new Date('2022-11-15'));
      const wrapper = mountMeetupsCalendar();
      const title = wrapper.find(SELECTOR_DATE).text();
      testMonthTitle(title, '2022-11-15');
    });

    it('MeetupsCalendar должен вывести Сентябрь 2022 в 5 рядов по 7 дней', () => {
      advanceTo(new Date('2022-09-15'));
      const wrapper = mountMeetupsCalendar();
      const cells = wrapper.findAll(SELECTOR_CELL);
      expect(cells.length).toBe(7 * 5);
    });

    it('MeetupsCalendar должен вывести только первые 3 и последние 2 дня Сентября 2022 неактивными', () => {
      advanceTo(new Date('2022-09-15'));
      const wrapper = mountMeetupsCalendar();
      const cells = wrapper.findAll(SELECTOR_CELL);
      testCellsInactive(cells, ['29', '30', '31'], 30, ['1', '2']);
    });

    it('MeetupsCalendar должен вывести корректные числа в ячейках Марта 2023 (+ 2 дня предыдущего и 2 дня следующего месяцев)', () => {
      advanceTo(new Date('2023-03-15'));
      const wrapper = mountMeetupsCalendar();
      const cells = wrapper.findAll(SELECTOR_CELL_DATE);
      testCellsText(cells, ['27', '28'], 31, ['1', '2']);
    });

    it('MeetupsCalendar должен вывести корректные числа в ячейках Апреля 2023 (+ 5 дней предыдущего и 0 дней следующего месяцев)', () => {
      advanceTo(new Date('2023-04-15'));
      const wrapper = mountMeetupsCalendar();
      testMonthCalendar(wrapper, '2023-04-15', ['27', '28', '29', '30', '31'], 30, []);
    });

    it('MeetupsCalendar должен вывести корректные числа в ячейках Мая 2023 (+ 0 дней предыдущего и 4 дня следующего месяцев)', () => {
      advanceTo(new Date('2023-05-15'));
      const wrapper = mountMeetupsCalendar();
      testMonthCalendar(wrapper, '2023-05-15', [], 31, ['1', '2', '3', '4']);
    });

    it('MeetupsCalendar должен вывести корректные числа в ячейках Февраля 2021 (без дней предыдущего и следующего месяцев)', () => {
      advanceTo(new Date('2021-02-15'));
      const wrapper = mountMeetupsCalendar();
      testMonthCalendar(wrapper, '2021-02-15', [], 28, []);
    });

    it('MeetupsCalendar должен корректно вывести Февраль 2021 после 10 переходов на следующий месяц с апреля 2020', async () => {
      advanceTo(new Date('2020-04-15'));
      const wrapper = mountMeetupsCalendar();
      for (let i = 0; i < 10; i++) {
        const nextMonthButton = wrapper.find(SELECTOR_NEXT_MONTH);
        await nextMonthButton.trigger('click');
      }
      testMonthCalendar(wrapper, '2021-02-15', [], 28, []);
    });

    it('MeetupsCalendar должен корректно вывести Февраль 2021 после 10 переходов на следующий месяц с 31 мая 2020', async () => {
      advanceTo(new Date('2020-05-31'));
      const wrapper = mountMeetupsCalendar();
      for (let i = 0; i < 9; i++) {
        const nextMonthButton = wrapper.get(SELECTOR_NEXT_MONTH);
        await nextMonthButton.trigger('click');
      }
      testMonthCalendar(wrapper, '2021-02-15', [], 28, []);
    });

    it('MeetupsCalendar должен корректно вывести Декабрь 2022 после 3 переходов на предыдущий месяц с Марта 2023', async () => {
      advanceTo(new Date('2023-03-15'));
      const wrapper = mountMeetupsCalendar();
      for (let i = 0; i < 3; i++) {
        const prevMonthButton = wrapper.get(SELECTOR_PREV_MONTH);
        await prevMonthButton.trigger('click');
      }
      testMonthCalendar(wrapper, '2022-12-15', ['28', '29', '30'], 31, ['1']);
    });

    it('MeetupsCalendar должен вывести два митапа в ячейке 12 мая после перехода на следующий месяц с апреля 2023', async () => {
      advanceTo(new Date('2023-04-15'));
      const meetups = [
        {
          id: 1,
          title: 'Meetup April 12 (previous month)',
          date: 1681257600000, // 2023-04-12
        },
        {
          id: 2,
          title: 'Meetup May 07 (wrong day)',
          date: 1683417600000, // 2023-05-07
        },
        {
          id: 3,
          title: 'Meetup #1 May 12',
          date: 1683849600000, // 2023-05-12
        },
        {
          id: 4,
          title: 'Meetup #2 May 12',
          date: 1683849600000, // 2023-05-12
        },
      ];
      const wrapper = mountMeetupsCalendar(meetups);
      const nextMonthButton = wrapper.get(SELECTOR_NEXT_MONTH);
      await nextMonthButton.trigger('click');
      const events = wrapper
        .findAll(SELECTOR_CELL)[11]
        .findAll(SELECTOR_EVENT)
        .map((w) => w.text());
      expect(events).toEqual([meetups[2].title, meetups[3].title]);
    });
  });
});
