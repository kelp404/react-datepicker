const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
const utils = require('../utils');
const CalendarMode = require('../constants/calendar-mode');

module.exports = class Calendar extends React.Component{
  static get propTypes() {
    return {
      displayDate: PropTypes.object.isRequired,
      onSelect: PropTypes.func.isRequired,
      selected: PropTypes.object,
      i18n: PropTypes.object
    };
  };

  static get defaultProps() {
    return {
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
      selected: props.selected
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    });
  }

  onClickPrevious(event) {
    event.preventDefault();
    switch (this.state.mode) {
      case CalendarMode.MONTH:
        const date = new Date(this.state.displayDate);
        date.setUTCMonth(date.getUTCMonth() - 1);
        this.setState({
          displayDate: date
        });
        break;
    }
  }
  onClickNext(event) {
    event.preventDefault();
    switch (this.state.mode) {
      case CalendarMode.MONTH:
        const date = new Date(this.state.displayDate);
        date.setUTCMonth(date.getUTCMonth() + 1);
        this.setState({
          displayDate: date
        });
        break;
    }
  }
  onClickDate(date, event) {
    event.preventDefault();
    this.props.onSelect(date);
  }

  render() {
    const classTable = {
      tenYears: classNames({
        hide: this.state.mode !== CalendarMode.TEN_YEARS
      }),
      year: classNames({
        hide: this.state.mode !== CalendarMode.YEAR
      }),
      month: classNames({
        hide: this.state.mode !== CalendarMode.MONTH
      })
    };
    let navigationZoomOutTitle;
    let headContent = [];
    let bodyContent = [];

    if (this.state.mode === CalendarMode.MONTH) {
      const start = utils.getCalendarStartDate(this.state.displayDate);
      navigationZoomOutTitle = `${this.props.i18n.months[start.getUTCMonth()]} ${start.getUTCFullYear()}`;
      headContent = this.props.i18n.days.slice();
      start.setUTCDate(1); // The first date of the display month.
      bodyContent = utils.generateCalendarContent(start, this.state.selected);
    }

    return (
      <div className="calendar">
        <div className={classTable.tenYears}>
          ten years
        </div>

        <div className={classTable.year}>
          year
        </div>

        <div className={classTable.month}>
          <a href="#previous" onClick={this.onClickPrevious.bind(this)}
             className="navigation-previous"><div className="triangle"/></a>
          <a href="#next" onClick={this.onClickNext.bind(this)}
             className="navigation-next"><div className="triangle"/></a>
          <a href="#zoom-out" className="navigation-zoom-out">
            {navigationZoomOutTitle}
          </a>
          <table>
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
                          <td key={`date-${item.date.getUTCDate()}`}
                              className={classNames({'is-not-display-month': !item.isDisplayMonth, 'active': item.isSelected})}>
                            <a href={`#${utils.formatDate(item.date)}`}
                               onClick={this.onClickDate.bind(this, item.date)}>{item.date.getUTCDate()}</a>
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
      </div>
    );
  }
};
