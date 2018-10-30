import React from 'react';
import $ from 'jquery';
import Guest from './guest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      start: null,
      end: null,
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleGetRequest = this.handleGetRequest.bind(this);
  }

  handleStartDate(event) {
    this.setState({
      start: event.target.value,
    });
  }


  handleEndDate(event) {
    this.setState({
      end: event.target.value,
    });
  }

  handleGetRequest() {
    $.ajax({
      method: 'GET',
      url: '/api/rooms/:listingId/booking',
      contentType: 'application/json',
      success: data => this.setState({ data: data }),
      error: err => console.error('error ', err),
    });
  }

  componentDidMount() {
    this.handleGetRequest();
  }

  render() {
    return (
      <div>
        <input type="date" id="start" onChange={e => this.handleStartDate(e)} />
        <input type="date" id="end" onChange={e => this.handleEndDate(e)} />
        <Guest />
      </div>
    );
  }
}

export default App;
