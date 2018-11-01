import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .booking-button {
    background-color: rgb(254, 90, 94, 1);
    border: none;
    color: #ffffff;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-weight: 800;
    margin: 0px;
    cursor: pointer;
    word-wrap: break-word;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: normal;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    border-radius: 10px;
    width: 250px;
  }
  .button-plus {
    border-radius: 100%;
  }
  .button-minus {
    border-radius: 100%;
  }
  .dropdown {
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 5px;
  }
`;

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
    console.log(this.state);
  }

  handleDecrement(guestType) {
    this.state[guestType] -= 1;
  }

  render() {
    const { drop } = this.state;

    return (
        <Wrapper>
          <div>
            <input className="booking-button" value="Book" type="button" onClick={this.handleDropMenu} />
            { drop ? (
            <div className="dropdown" ref={ele => this.menu = ele}>
              <p>Adults</p>
              <input className="button-plus" value="-" type="button" onClick={() => this.handleDecrement('adults')} />
              <input className="button-minus" value="+" type="button" onClick={() => this.handleIncrement('adults')} />
              <p>Children</p>
              <input className="button-plus" value="-" type="button" onClick={() => this.handleDecrement('children')} />
              <input className="button-minus" value="+" type="button" onClick={() => this.handleIncrement('children')} />
              <p>Infants</p>
              <input className="button-plus" value="-" type="button" onClick={() => this.handleDecrement('infants')} />
              <input className="button-minus" value="+" type="button" onClick={() => this.handleIncrement('infants')} />
            </div>) : null }
          </div>
        </Wrapper>
    );
  }
}

export default Guest;
