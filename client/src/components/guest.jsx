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

  render() {
    const { drop } = this.state;

    return (
      <div>
        <h1>Booking Button</h1>
        <input value="Book" type="button" onClick={this.handleDropMenu} />
        { drop ? (
          <div ref={ele => this.menu = ele}>
            <p>Adults</p>
            <input value="-" type="button" />
            <input value="+" type="button" />
            <p>Children</p>
            <input value="-" type="button" />
            <input value="+" type="button" />
            <p>Infants</p>
            <input value="-" type="button" />
            <input value="+" type="button" />
          </div>) : null }
      </div>
    );
  }
}

export default Guest;
