import React from 'react';
import $ from 'jquery';
import Guest from './guest.jsx';
import Calendar from './calendar.jsx';
import styled from 'styled-components';

// material-ui

const Wrapper = styled.section`
  .drop-calendars {
    display: flex;
    flex-direction: row;
  }
  .booking-module {
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      start: 'Check In',
      end: 'Check Out',
      showCal: false,
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleGetRequest = this.handleGetRequest.bind(this);
    this.renderAsyncData = this.renderAsyncData.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.hideCalendar = this.hideCalendar.bind(this);
  }

  componentDidMount() {
    this.handleGetRequest('5bd91f697190430ef5e5a400');
  }

  handleStartDate(event) {
    this.hideCalendar();
    this.setState({
      start: event.target.getAttribute('value'),
    });
  }


  handleEndDate(event) {
    this.hideCalendar();
    this.setState({
      end: event.target.getAttribute('value'),
    });
  }

  handleGetRequest(id) {
    $.ajax({
      method: 'GET',
      url: `/api/rooms/${id}/booking`,
      contentType: 'application/json',
      success: data => this.setState({ data: data }),
      error: err => console.error('error ', err),
    });
  }


  showCalendar() {
    this.setState({
      showCal: true,
    });
  }

  hideCalendar() {
    this.setState({
      showCal: false,
    });
  }

  renderAsyncData() {
    const { data } = this.state;

    if (!data) {
      return (
        <div><p>...</p></div>
      );
    } else {
      return (
        <div className="listing-information">
          <p>{data[0].pricing} per night</p>
          <p>{data[0].average_review} {data[0].total_reviews}</p>
        </div>
      );
    }
  }

  render() {
    const { start, end, showCal } = this.state;
    return (
      <Wrapper>
        <div className="booking-module">
          {this.renderAsyncData()}
          <div className="calendars">
            <Calendar show={showCal} getDate={this.handleStartDate} />
            <Calendar show={showCal} getDate={this.handleEndDate} />
            <input type="text" value={start} onClick={this.showCalendar} readOnly />
            <input type="text" value={end} onClick={this.showCalendar} readOnly />
          </div>
          <Guest />
        </div>
      </Wrapper>
    );
  }
}

export default App;
