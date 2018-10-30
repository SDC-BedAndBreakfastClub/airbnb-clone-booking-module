import React from 'react';

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drop: false,
      adults: 0,
      children: 0,
      infants: 0,
    };

    this.handleDropMenu = this.handleDropMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleDropMenu(event) {
    event.preventDefault();

    this.setState({
      drop: true,
    }, () => document.addEventListener('click', this.handleCloseMenu));
  }

  handleCloseMenu(event) {
    if (!this.menu.contains(event.target)) {
      this.setState({
        drop: false,
      }, () => document.removeEventListener('click', this.handleCloseMenu));
    }
  }

  handleIncrement(guestType) {
    this.state[guestType] += 1;
  }

  handleDecrement(guestType) {
    this.state[guestType] -= 1;
  }

  render() {
    const { drop } = this.state;

    return (
      <div>
        <h1>Booking Button</h1>
        <input value="Book" type="button" onClick={this.handleDropMenu} />
        { drop ? (
          <div ref={ele => this.menu = ele}>
            <p>Adults</p>
            <input value="-" type="button" onClick={() => this.handleDecrement('adults')} />
            <input value="+" type="button" onClick={() => this.handleIncrement('adults')} />
            <p>Children</p>
            <input value="-" type="button" onClick={() => this.handleDecrement('children')} />
            <input value="+" type="button" onClick={() => this.handleIncrement('children')} />
            <p>Infants</p>
            <input value="-" type="button" onClick={() => this.handleDecrement('infants')} />
            <input value="+" type="button" onClick={() => this.handleIncrement('infants')} />
          </div>) : null }
      </div>
    );
  }
}

export default Guest;
