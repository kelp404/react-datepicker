# react-datepicker
A react datepicker.


## Setup the develop environment
### 1. Install node modules
```bash
$ npm install
```
### 2. Run the develop server
```bash
$ npm start
# Go to http://localhost:8000
```


## Document

### Properties of Datepicker

  Name       |        Type      |   Default  |  Description
:---------:|:-----------:|:--------:|:-----------:
   date        | string           |    null     |                  
   onSelect  | function(date)|              | Called when a date is selected.
   others    |      any          |     null    | That will pass to the input element.


## Example
```js
const React = require('react');
const ReactDOM = require('react-dom');
const Datepicker = require('../');

ReactDOM.render(<Datepicker/>, document.getElementById('root'));
```
