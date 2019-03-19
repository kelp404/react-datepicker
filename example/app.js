require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const Datepicker = require('../');

ReactDOM.render(
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
      <div className="row mt-2">
        <div className="col-12">
          <form className="form-inline">
            <div className="form-group">
              <Datepicker className="form-control"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </React.Fragment>,
  document.getElementById('root')
);
