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
      showCalStart: false,
      showCalEnd: false,
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleGetRequest = this.handleGetRequest.bind(this);
    this.renderAsyncData = this.renderAsyncData.bind(this);
    this.showCalendarStart = this.showCalendarStart.bind(this);
    this.hideCalendarStart = this.hideCalendarStart.bind(this);
    this.showCalendarEnd = this.showCalendarEnd.bind(this);
    this.hideCalendarEnd = this.hideCalendarEnd.bind(this);
  }

  componentDidMount() {
    this.handleGetRequest('5bd91f697190430ef5e5a400');
  }

  handleStartDate(event) {
    this.hideCalendarStart();
    this.setState({
      start: event.target.getAttribute('value'),
    });
  }


  handleEndDate(event) {
    this.hideCalendarEnd();
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


  showCalendarStart() {
    this.setState({
      showCalStart: true,
    });
  }

  hideCalendarStart() {
    this.setState({
      showCalStart: false,
    });
  }

  showCalendarEnd() {
    this.setState({
      showCalEnd: true,
    });
  }

  hideCalendarEnd() {
    this.setState({
      showCalEnd: false,
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
    const { start, end, showCalStart, showCalEnd } = this.state;
    return (
      <Wrapper>
        <div className="booking-module">
          {this.renderAsyncData()}
          <div className="calendars">
            <Calendar show={showCalStart} getDate={this.handleStartDate} />
            <Calendar show={showCalEnd} getDate={this.handleEndDate} />
            <input type="text" value={start} onClick={this.showCalendarStart} readOnly />
            <input type="text" value={end} onClick={this.showCalendarEnd} readOnly />
          </div>
          <Guest />
        </div>
      </Wrapper>
    );
  }
}

export default App;
