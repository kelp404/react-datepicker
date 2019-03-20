const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
const utils = require('../utils');
const CalendarMode = require('../constants/calendar-mode');

module.exports = class Calendar extends React.Component{
  static get propTypes() {
    return {
      displayDate: PropTypes.object.isRequired, // {Date}
      onSelect: PropTypes.func.isRequired,
      selected: PropTypes.object, // {Date}
      isHidden: PropTypes.bool.isRequired, // {bool} Is hide the calendar?
      i18n: PropTypes.object
    };
  };

  static get defaultProps() {
    return {
      isHidden: true,
      i18n: {
        days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      mode: CalendarMode.MONTH,
      displayDate: props.displayDate,
      selected: props.selected,
      isHidden: props.isHidden
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected,
      isHidden: nextProps.isHidden
    });
  }

  onClickZoomOut(event) {
    /*
    Change the display mode.
    @param event {Event}
     */
    event.preventDefault();
    switch (this.state.mode) {
      case CalendarMode.MONTH:
        this.setState({
          mode: CalendarMode.YEAR
        });
        break;
      case CalendarMode.YEAR:
        this.setState({
          mode: CalendarMode.TEN_YEARS
        });
        break;
    }
  }
  onClickPrevious(event) {
    /*
    Click the previous button.
    @param event {Event}
     */
    event.preventDefault();
    const date = new Date(this.state.displayDate);
    switch (this.state.mode) {
      case CalendarMode.MONTH:
        date.setUTCMonth(date.getUTCMonth() - 1);
        this.setState({
          displayDate: date
        });
        break;
      case CalendarMode.YEAR:
        date.setUTCFullYear(date.getUTCFullYear() - 1);
        this.setState({
          displayDate: date
        });
        break;
      case CalendarMode.TEN_YEARS:
        date.setUTCFullYear(date.getUTCFullYear() - 10);
        this.setState({
          displayDate: date
        });
        break;
    }
  }
  onClickNext(event) {
    /*
    Click the next button.
    @param event {Event}
     */
    event.preventDefault();
    const date = new Date(this.state.displayDate);
    switch (this.state.mode) {
      case CalendarMode.MONTH:
        date.setUTCMonth(date.getUTCMonth() + 1);
        this.setState({
          displayDate: date
        });
        break;
      case CalendarMode.YEAR:
        date.setUTCFullYear(date.getUTCFullYear() + 1);
        this.setState({
          displayDate: date
        });
        break;
      case CalendarMode.TEN_YEARS:
        date.setUTCFullYear(date.getUTCFullYear() + 10);
        this.setState({
          displayDate: date
        });
        break;
    }
  }
  onClickDate(date, event) {
    /*
    Select the item of the calendar.
    @param date {Date}
    @param event {Event}
     */
    event.preventDefault();
    switch (this.state.mode) {
      case CalendarMode.MONTH:
        this.props.onSelect(date);
        break;
      case CalendarMode.YEAR:
        this.setState({
          mode: CalendarMode.MONTH,
          displayDate: date
        });
        break;
      case CalendarMode.TEN_YEARS:
        this.setState({
          mode: CalendarMode.YEAR,
          displayDate: date
        });
        break;
    }
  }

  render() {
    const calendarClass = classNames({
      calendar: true,
      hide: this.state.isHidden
    });
    let navigationZoomOutTitle;
    let headContent = [];
    let bodyContent = [];

    const start = utils.getCleanDate(this.state.displayDate);
    start.setUTCDate(1); // The first date of the display month.
    switch (this.state.mode) {
      case CalendarMode.MONTH:
        navigationZoomOutTitle = `${this.props.i18n.months[start.getUTCMonth()]} ${start.getUTCFullYear()}`;
        headContent = this.props.i18n.days.slice();
        bodyContent = utils.generateCalendarContentInMonth(start, this.state.selected);
        break;
      case CalendarMode.YEAR:
        navigationZoomOutTitle = `${start.getUTCFullYear()}`;
        bodyContent = utils.generateCalendarContentInYear(start, this.state.selected);
        break;
      case CalendarMode.TEN_YEARS:
        const startYearPrefix = `${start.getUTCFullYear()}`.substr(0, 3);
        navigationZoomOutTitle = `${startYearPrefix}0-${startYearPrefix}9`;
        bodyContent = utils.generateCalendarContentInTenYears(start, this.state.selected);
        break;
    }

    return (
      <div className={calendarClass}>
        <a href="#previous" onClick={this.onClickPrevious.bind(this)}
           className="navigation-previous"><div className="triangle"/></a>
        <a href="#next" onClick={this.onClickNext.bind(this)}
           className="navigation-next"><div className="triangle"/></a>
        <a href="#zoom-out" onClick={this.onClickZoomOut.bind(this)}
           className="navigation-zoom-out">
          {navigationZoomOutTitle}
        </a>
        <table className={this.state.mode}>
          {
            (() => {
              if (headContent.length) {
                return (
                  <thead><tr>
                    {
                      headContent.map((item, index) => {
                        return <th key={`days-${index}`}>{item}</th>;
                      })
                    }
                  </tr></thead>
                );
              }
            })()
          }
          <tbody>
          {
            bodyContent.map((row, index) => {
              return (
                <tr key={`week-${index}`}>
                  {
                    row.map(item => {
                      return (
                        <td key={`date-${utils.formatDate(item.date)}`}
                            className={classNames({'is-not-display-month': !item.isDisplayMonth, 'active': item.isSelected})}>
                          <a href={`#${utils.formatDate(item.date)}`}
                             onClick={this.onClickDate.bind(this, item.date)}>
                            {
                              (() => {
                                switch (this.state.mode) {
                                  case CalendarMode.MONTH:
                                    return item.date.getUTCDate();
                                  case CalendarMode.YEAR:
                                    return this.props.i18n.months[item.date.getUTCMonth()];
                                  case CalendarMode.TEN_YEARS:
                                    return item.date.getUTCFullYear();
                                }
                              })()
                            }
                          </a>
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
};
