import React from 'react';
import $ from 'jquery';
import Guest from './guest.jsx';
import Calendar from './calendar.jsx';
import styled from 'styled-components';

const Wrapper = styled.section`
  font-family: 'Montserrat', sans-serif;
  .drop-calendars {
    display: flex;
    flex-direction: row;
  }
  .booking-module {
    box-sizing: content-box;    
    width: 300px;
    height: 450px;
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
  }
  .listing-information{
    margin-bottom: 16px;
    border-bottom: 1px solid #e4e4e4;
  }
  .calendars {
    margin-bottom: 8px;
    margin-top: 16px;
  }
  .star {
    display: inline-block;
    color: #008489;
    font-size: 9px;
    height: 10px;
    margin-right: 1px;
    width: 9px;
  }
  .start-cal {
    border: 0px;
    width: 110px;
  }
  input[value] {
    font-size: 18px;
  }
  .end-cal {
    border: 0px;
    width: 135px;

  }
  .input-calendar {
    display: inline-block;
    padding: 5px
    font-weight: 600 !important;
    border: 1px solid #e4e4e4;
  }
  .arrow {
    display: inline-block !important;
    vertical-align: middle !important;
    padding-right: 15px
    height: 24px;
    width: 24px;
    fill: currentcolor;
  }
  .dates-label {
    padding-bottom: 5px;
  }
  .modal {
    z-index: 99;
  }
  
`;

class Booking extends React.Component {
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
    this.showCalendarStart = this.showCalendarStart.bind(this);
    this.showCalendarEnd = this.showCalendarEnd.bind(this);
  }

  componentDidMount() {
    const id = (window.location.pathname).split('/')[2];
    this.handleGetRequest(id);
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

  handleGetRequest(id = Math.ceil(Math.random() * 100)) {
    $.ajax({
      method: 'GET',
      url: `/api/rooms/${id}/booking`,
      contentType: 'application/json',
      success: data => this.setState({ data }),
      error: err => console.error('error ', err),
    });
  }

  showCalendarStart() {
    this.setState({
      showCalStart: true,
      showCalEnd: false,
    });
  }

  hideCalendarStart() {
    this.setState({
      showCalStart: false,
    });
  }

  showCalendarEnd() {
    this.setState({
      showCalStart: false,
      showCalEnd: true,
    });
  }

  hideCalendarEnd() {
    this.setState({
      showCalEnd: false,
    });
  }


  generateStarRating(num) {
    const { data } = this.state;
    const starStyle = {
      height: '1em',
      width: '1em',
      display: 'block',
      fill: 'currentcolor',
    };
    const rating = (Math.round(num * 2) / 2).toFixed(1);
    let starArray = [];
    const wholeStar = <svg viewBox="0 0 1000 1000" style={starStyle}><path d="M971.5 379.5c9 28 2 50-20 67L725.4 618.6l87 280.1c11 39-18 75-54 75-12 0-23-4-33-12l-226.1-172-226.1 172.1c-25 17-59 12-78-12-12-16-15-33-8-51l86-278.1L46.1 446.5c-21-17-28-39-19-67 8-24 29-40 52-40h280.1l87-278.1c7-23 28-39 52-39 25 0 47 17 54 41l87 276.1h280.1c23.2 0 44.2 16 52.2 40z"></path></svg>;
    const halfStar = <svg viewBox="0 0 1000 1000" style={starStyle}><path d="M510.2 23.3l1 767.3-226.1 172.2c-25 17-59 12-78-12-12-16-15-33-8-51l86-278.1L58 447.5c-21-17-28-39-19-67 8-24 29-40 52-40h280.1l87-278.1c7.1-23.1 28.1-39.1 52.1-39.1z"></path></svg>;

    for (let i = 0; i < rating; i += 1) {
      if (rating - i > 1) {
        starArray.push(<span key={rating - i} className="star">{wholeStar}</span>);
      } else {
        starArray.push(<span key={rating - i} className="star">{halfStar}</span>);
      }
    }

    return (
      <div className="listing-ratings">
        <span className="star-ratings">{starArray}</span>
        <span>
          <small>
            {data[0].total_reviews}
          </small>
        </span>
      </div>

    );
  }

  updateGuestData() {
    const { data, start, end } = this.state;
    console.log("DATA", data);
    if (!data) {
      return (
        <Guest />
      );
    }
    return (
      <Guest data={data[0]} start={start} end={end} max={data[0].max_guests} />
    );
  }

  renderAsyncData() {
    const { data } = this.state;

    if (!data) {
      return (
        <div><p>...</p></div>
      );
    }
    return (
      <div className="listing-information">
        <div className="listing-price-info">
          <span className="listing-price"><b>${data[0].pricing} </b></span>
          <span><b>per night</b></span>
          {this.generateStarRating(data[0].average_review)}
        </div>
      </div>
    );
  }

  render() {
    const { start, end, showCalStart, showCalEnd } = this.state;
    return (
      <Wrapper>
        <div className="booking-module">
          {this.renderAsyncData()}
          <div className="calendars">
            <div className="dates-label">
              <label>
                <small><b>Dates</b></small>
              </label>
            </div>
            <div>
              <div className="modal cal-start">
                <Calendar show={showCalStart} getDate={this.handleStartDate} />
              </div>
              <div className="modal cal-end">
                <Calendar show={showCalEnd} getDate={this.handleEndDate} />
              </div>
            </div>
            <div className="input-calendar">
              <input className="start-cal" type="text" value={start} onClick={this.showCalendarStart} readOnly />
              <svg className="arrow" viewBox="0 0 24 24"><path d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z"></path></svg>
              <input className="end-cal" type="text" value={end} onClick={this.showCalendarEnd} readOnly />
            </div>
          </div>
          {this.updateGuestData()}
        </div>
      </Wrapper>
    );
  }
}

export default Booking;
