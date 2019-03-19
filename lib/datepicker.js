require('./stylesheets.scss');
const React = require('react');
const PropTypes = require('prop-types');
const Calendar = require('./components/calendar');
const utils = require('./utils');

module.exports = class Datepicker extends React.Component {
  static get propTypes() {
    return {
      onChange: PropTypes.func
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowCalendar: false,
      displayDate: new Date(),
      selected: null
    }
  }

  // events
  onFocus() {
    this.setState({
      isShowCalendar: true
    });
  }
  onSelect(date) {
    this.setState({
      selected: date,
      isShowCalendar: false
    });
  }

  render() {
    return (
      <div className="react-datepicker">
        <input readOnly value={utils.formatDate(this.state.selected)}
               onFocus={this.onFocus.bind(this)}
               {...this.props}/>
        <Calendar isHidden={!this.state.isShowCalendar}
                  displayDate={this.state.displayDate}
                  selected={this.state.selected}
                  onSelect={this.onSelect.bind(this)}/>
      </div>
    );
  }
};
