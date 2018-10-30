import React from 'react';
import Guest from './guest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: null,
      end: null,
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
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
