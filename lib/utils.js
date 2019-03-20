const leftPad = require('left-pad');
const CalendarMode = require('./constants/calendar-mode');

const isSelected = (a, b, calendarMode) => {
  /*
  Compare two dates.
  @param a {Date|null}
  @param b {Date|null}
  @param calendarMode {string} CalendarMode
  @returns {boolean}
   */
  if (!a || !b) {
    return false;
  }
  switch (calendarMode) {
    case CalendarMode.TEN_YEARS:
      return a.getUTCFullYear() === b.getUTCFullYear();
    case CalendarMode.YEAR:
      return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth();
    case CalendarMode.MONTH:
    default:
      return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
  }
};
exports.isSelected = isSelected;

exports.getCleanDate = (date) => {
  /*
  Get a clean date.
  @param date {Date}
  @returns {Date}
   */
  const result = new Date('2019-01-01T00:00:00.000Z');
  result.setUTCFullYear(date.getUTCFullYear());
  result.setUTCMonth(date.getUTCMonth());
  result.setUTCDate(date.getUTCDate());
  return result;
};

exports.formatDate = (date) => {
  /*
  @param date {Date}
  @returns {string} ex: "2019-03-01"
   */
  if (!date) {
    return '';
  }
  return `${date.getUTCFullYear()}-${leftPad(date.getUTCMonth() + 1, 2, '0')}-${leftPad(date.getUTCDate(), 2, '0')}`;
};

exports.generateCalendarContentInTenYears = (displayDate, selectedDate) => {
  /*
  @param displayDate {Date}
  @param selectedDate {Date}
  @returns {Array<Array<{date: {Date}, isSelected: {boolean}, isDisplayMonth: {boolean}}>>}
   */
  const result = [];
  const indexDate = new Date(displayDate);
  const startYearPrefix = `${displayDate.getUTCFullYear()}`.substr(0, 3);
  indexDate.setUTCMonth(0);
  indexDate.setUTCFullYear(+`${startYearPrefix}0`);
  // complete previous year
  indexDate.setUTCFullYear(indexDate.getUTCFullYear() - 1);
  result.push([{
    date: new Date(indexDate),
    isSelected: isSelected(indexDate, selectedDate, CalendarMode.TEN_YEARS),
    isDisplayMonth: false
  }]);
  indexDate.setUTCFullYear(indexDate.getUTCFullYear() + 1);
  // push this year
  while (`${indexDate.getUTCFullYear()}`.substr(0, 3) === startYearPrefix) {
    result[result.length - 1].push({
      date: new Date(indexDate),
      isSelected: isSelected(indexDate, selectedDate, CalendarMode.TEN_YEARS),
      isDisplayMonth: true
    });
    indexDate.setUTCFullYear(indexDate.getUTCFullYear() + 1);
    if (result[result.length - 1].length >= 4) {
      result.push([]);
    }
  }
  // complete next year
  indexDate.setUTCFullYear(indexDate.getUTCFullYear() + 1);
  result[result.length - 1].push({
    date: new Date(indexDate),
    isSelected: isSelected(indexDate, selectedDate, CalendarMode.TEN_YEARS),
    isDisplayMonth: false
  });
  return result;
};
exports.generateCalendarContentInYear = (displayDate, selectedDate) => {
  /*
  @param displayDate {Date}
  @param selectedDate {Date}
  @returns {Array<Array<{date: {Date}, isSelected: {boolean}, isDisplayMonth: {boolean}}>>}
   */
  const result = [];
  const indexDate = new Date(displayDate);
  indexDate.setUTCMonth(0);
  while (indexDate.getUTCFullYear() === displayDate.getUTCFullYear()) {
    result.push([]);
    for (let index = 0; index < 4; index += 1) {
      result[result.length - 1].push({
        date: new Date(indexDate),
        isSelected: isSelected(indexDate, selectedDate, CalendarMode.YEAR),
        isDisplayMonth: true
      });
      indexDate.setUTCMonth(indexDate.getUTCMonth() + 1);
    }
  }
  return result;
};
exports.generateCalendarContentInMonth = (start, selectedDate) => {
  /*
  @param start {Date}
  @param selectedDate {Date}
  @returns {Array<Array<{date: {Date}, isSelected: {boolean}, isDisplayMonth: {boolean}}>>}
   */
  const result = [];

  // complete previous month
  if (start.getUTCDay() !== 0) {
    const previousMonth = new Date(start);
    previousMonth.setUTCDate(previousMonth.getUTCDate() - start.getUTCDay());
    result.push([]);
    for (let index = start.getUTCDay(); index > 0; index -= 1) {
      result[result.length - 1].push({
        date: new Date(previousMonth),
        isSelected: isSelected(previousMonth, selectedDate),
        isDisplayMonth: false
      });
      previousMonth.setUTCDate(previousMonth.getUTCDate() + 1);
    }
  } else {
    result.push([]);
  }
  // push this month
  const indexDate = new Date(start);
  while (indexDate.getUTCMonth() === start.getUTCMonth()) {
    if (result[result.length - 1].length >= 7) {
      result.push([]);
    }
    result[result.length - 1].push({
      date: new Date(indexDate),
      isSelected: isSelected(indexDate, selectedDate),
      isDisplayMonth: true
    });
    indexDate.setUTCDate(indexDate.getUTCDate() + 1);
  }
  // complete next month
  const nextMonth = new Date(start);
  nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1);
  while (result.length <= 6) {
    while (result[result.length - 1].length < 7) {
      result[result.length - 1].push({
        date: new Date(nextMonth),
        isSelected: isSelected(nextMonth, selectedDate),
        isDisplayMonth: false
      });
      nextMonth.setUTCDate(nextMonth.getUTCDate() + 1);
    }
    result.push([]);
  }
  result.pop();

  return result;
};
