import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Route path="/rooms/:id/booking" component={App} />
  </Router>,
  document.getElementById('booking'),
);
