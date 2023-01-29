import meetups from './api/meetups.js';

/**
 * Получение данных митапа по Meetup ID с API
 * @param {Number} meetupId
 * @return {Promise<Object>} - Данные митапа
 * @throws {Error} - Ошибка получения данных митапа
 */
export async function fetchMeetupById(meetupId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const meetup = meetups.find((meetup) => meetup.id === meetupId);
      if (!meetup) {
        reject(new Error('Not found'));
      }
      resolve(meetup);
    }, 500);
  });
}

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
export const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
export const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};
