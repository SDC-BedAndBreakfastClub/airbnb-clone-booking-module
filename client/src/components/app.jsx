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
    box-sizing: content-box;    
    width: 300px;
    height: 500px;
    padding: 30px;    
    border: 1px solid #e4e4e4;
    margin-right: 16px;
    margin-left: 12px;
    margin-top: 12px;
  }
  .listing-price {
    font-size: 20px;
  }
  .listing-price-info {
    margin-bottom: 10px;
  }
  .listing-ratings {
    margin-bottom: 16px;
    border-bottom: 1px solid #e4e4e4;
  }
  .calendar {
    margin-bottom: 8px;
    margin-top: 16px;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{max_guests: 0}],
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
    this.updateGuestData = this.updateGuestData.bind(this);
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
    }, () => document.addEventListener('click', this.hideCalendarStart));
  }

  hideCalendarStart() {
    this.setState({
      showCalStart: false,
    }, () => document.removeEventListener('click', this.hideCalendarStart));
  }

  showCalendarEnd() {
    this.setState({
      showCalEnd: true,
    }, () => document.addEventListener('click', this.hideCalendarEnd));
  }

  hideCalendarEnd() {
    this.setState({
      showCalEnd: false,
    }, () => document.removeEventListener('click', this.hideCalendarEnd));
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
          <div className="listing-price-info">
            <span className="listing-price"><b>${data[0].pricing} </b></span><span>per night</span>
          </div>
          <div className="listing-ratings">
            <span>{data[0].average_review} {data[0].total_reviews}</span>
          </div>
        </div>
      );
    }
  }

  updateGuestData() {
    const { data } = this.state;

    if (!data) {
      return (
        <Guest />
      );
    } else {
      return (
        <Guest info={data} />
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
            <div>
              <label>
                <small>Dates</small>
              </label>
            </div>
            <div>
              <Calendar show={showCalStart} getDate={this.handleStartDate} />
              <Calendar show={showCalEnd} getDate={this.handleEndDate} />
              <input type="text" value={start} onClick={this.showCalendarStart} readOnly />
              <input type="text" value={end} onClick={this.showCalendarEnd} readOnly />
            </div>
          </div>
          {this.updateGuestData()}
        </div>
      </Wrapper>
    );
  }
}

export default App;
