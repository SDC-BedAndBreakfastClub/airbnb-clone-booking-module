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
      dropCal1: false,
      dropCal2: false,
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleGetRequest = this.handleGetRequest.bind(this);
    this.renderAsyncData = this.renderAsyncData.bind(this);
  }

  componentDidMount() {
    this.handleGetRequest('5bd91f697190430ef5e5a400');
  }

  handleStartDate(event) {
    this.setState({
      start: event.target.getAttribute('value'),
    });
  }


  handleEndDate(event) {
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

  renderAsyncData() {
    const { data } = this.state;
    console.log(data);

    if(!data) {
      return (
        <div><p>...</p></div>
      );
    } else {
      return (
        <div className="listing-information">
          <p>{data[0].pricing} per night</p>
          <p>{data[0].average_review} {data[0].total_reviews}</p>
        </div>
      )
    }
  }

  render() {
    return (
      <Wrapper>
        <div className="booking-module">
          {this.renderAsyncData()}
          <div className="calendars">
            <input type="text" value={this.state.start} readonly/>
            <input type="text" value={this.state.end} readonly/>
            <div className="drop-calendars" ref={ele => this.calendar = ele}>
              <Calendar getDate={this.handleStartDate} />
              <Calendar getDate={this.handleEndDate} />
            </div>
          </div>
          <Guest />
        </div>
      </Wrapper>
    );
  }
}

export default App;
