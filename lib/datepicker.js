require('./stylesheets.scss');
const React = require('react');
const PropTypes = require('prop-types');
const Calendar = require('./components/calendar');
const utils = require('./utils');

module.exports = class Datepicker extends React.Component {
  static get propTypes() {
    return {
      date: PropTypes.string,
      onSelect: PropTypes.func
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowCalendar: false,
      displayDate: new Date(),
      selected: null
    };
    if (props.date) {
      // Initial with the default value.
      const date = new Date(`${props.date}T00:00:00.000Z`);
      this.state.displayDate = date;
      this.state.selected = utils.getCleanDate(date);
    }
  }

  // events
  onFocus() {
    /*
    When the user focus on the input box.
     */
    this.setState({
      isShowCalendar: true
    });
  }
  onSelect(date) {
    /*
    When the user select a date on the calendar.
    @param date {Date}
     */
    this.setState({
      selected: date,
      isShowCalendar: false
    });
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(utils.formatDate(date));
    }
  }

  render() {
    const inputProps = {};
    for (let key in this.props) {
      if (['date', 'onSelect'].indexOf(key) >= 0) {
        continue;
      }
      inputProps[key] = this.props[key];
    }

    return (
      <div className="react-datepicker">
        <input readOnly value={utils.formatDate(this.state.selected)}
               onFocus={this.onFocus.bind(this)}
               {...inputProps}/>
        <Calendar isHidden={!this.state.isShowCalendar}
                  displayDate={this.state.displayDate}
                  selected={this.state.selected}
                  onSelect={this.onSelect.bind(this)}/>
      </div>
    );
  }
};
