import React from 'react';
import $ from 'jquery';
import Guest from './guest.jsx';
import Calendar from './calendar.jsx';
import styled from 'styled-components';

const Wrapper = styled.section`
  .calendars {
    display: flex;
    flex-direction: row;
  }
`;

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

  handleGetRequest(id) {
    $.ajax({
      method: 'GET',
      url: `/api/rooms/${id}/booking`,
      contentType: 'application/json',
      success: data => this.setState({ data: data }),
      error: err => console.error('error ', err),
    });
  }

  componentDidMount() {
    this.handleGetRequest('5bd91f697190430ef5e5a400');
  }

  render() {
    return (
      <div>
        <Wrapper>
          <div className="calendars">
            <Calendar />
            <Calendar />
          </div>
        </Wrapper>
        <Guest />
      </div>
    );
  }
}

export default App;
