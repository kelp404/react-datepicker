const leftPad = require('left-pad');
const CalendarMode = require('./constants/calendar-mode');

const isSelected = (a, b, calendarMode) => {
  /*
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

exports.getCalendarStartDate = (date) => {
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
  return `${date.getUTCFullYear()}-${leftPad(date.getUTCMonth(), 2, '0')}-${leftPad(date.getUTCDate(), 2, '0')}`;
};

exports.generateCalendarContent = (start, selectedDate) => {
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
