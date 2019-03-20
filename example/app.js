require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const Datepicker = require('../');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      defaultValue: '2019-03-01'
    }
  }
  onSelect(date) {
    this.state.events.unshift(date);
    this.forceUpdate();
  }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">react-datepicker</a>
          <button className="navbar-toggler" type="button"
                  data-toggle="collapse" data-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-12 mt-3">
              <h3>Without default values.</h3>
              <hr/>
              <form className="form-inline">
                <div className="form-group">
                  <Datepicker className="form-control"/>
                </div>
              </form>
            </div>
            <div className="col-12 mt-3">
              <h3>With default value "2019-03-01" and event "onSelect()".</h3>
              <hr/>
              <div className="row">
                <div className="col-3">
                  <form className="form-inline">
                    <div className="form-group">
                      <Datepicker date={this.state.defaultValue}
                                  onSelect={this.onSelect.bind(this)}
                                  className="form-control"/>
                    </div>
                  </form>
                </div>
                <div className="col-9">
                  <div className="card">
                    <div className="card-body">
                      {this.state.events.map((event, index) => {
                        return <p key={`event-${index}`}>Selected: {event}</p>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
