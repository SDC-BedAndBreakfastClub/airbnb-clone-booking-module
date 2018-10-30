import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };
  }

  handleClick() {
    this.setState({
      clicked: true,
    });
  }

  // conditional rendering

  render() {
    const { clicked } = this.state;
    if (!clicked) {
      return (
        <div>
          <input type="button" onClick={this.handleClick.bind(this)} />
          <input type="date" id="start" />
          <input type="date" id="end" />
        </div>
      );
    } else {
      return (
        <div>
          <input type="button" />
        </div>
      );
    }
  }
}

export default App;
