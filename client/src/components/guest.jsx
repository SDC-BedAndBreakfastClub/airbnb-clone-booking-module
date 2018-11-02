import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
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
    margin-top: 24px;
  }
  .button-plus {
    border-radius: 100%;
  }
  .button-minus {
    border-radius: 100%;
  }
  .dropdown {
    box-sizing: content-box;    
    width: 300px;
    height: 500px;
    padding: 30px;    
    border: 1px solid #e4e4e4;
    right: 20%;
    margin-right: 16px;
    margin-left: 12px;
    margin-top: 12px;
    background-color: rgba(255,255,255,1);
  }
  .guest-bar {
    border: 0px;
  }
  .guest-display {
    border: 1px solid #e4e4e4;
    padding: 5px  
  }
  input[value] {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
  }
  .guest-label {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .adults {
    display: flex;
    flex-direction: row;
  }
`;

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drop: false,
      adults: 1,
      children: 0,
      infants: 0,
      total: 1,
    };

    this.handleDropMenu = this.handleDropMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleAdultIncrement = this.handleAdultIncrement.bind(this);
    this.handleAdultDecrement = this.handleAdultDecrement.bind(this);
    this.handleChildrenIncrement = this.handleChildrenIncrement.bind(this);
    this.handleChildrenDecrement = this.handleChildrenDecrement.bind(this);
    this.handleInfantIncrement = this.handleInfantIncrement.bind(this);
    this.handleInfantDecrement = this.handleInfantDecrement.bind(this);
    this.renderGuestBar = this.renderGuestBar.bind(this);
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

  handleAdultIncrement() {
    const { adults, children } = this.state;
    if (this.props.max > adults + children) {
      this.setState(prevState => ({
        adults: prevState.adults + 1,
        total: prevState.total + 1,
      }));
    }
  }

  handleAdultDecrement() {
    const { adults } = this.state;
    if (adults > 1) {
      this.setState(prevState => ({
        adults: prevState.adults - 1,
        total: prevState.total - 1,
      }));
    }
  }

  handleChildrenIncrement() {
    const { adults, children } = this.state;
    if (this.props.max > adults + children) {
      this.setState(prevState => ({
        children: prevState.children + 1,
        total: prevState.total + 1,
      }));
    }
  }

  handleChildrenDecrement() {
    const { children } = this.state;
    if (children > 0) {
      this.setState(prevState => ({
        children: prevState.children - 1,
        total: prevState.total - 1,
      }));
    }
  }

  handleInfantIncrement() {
    const { infants } = this.state;
    if (infants < 8) {
      this.setState(prevState => ({
        infants: prevState.infants + 1,
        total: prevState.total + 1,
      }));
    }
  }

  handleInfantDecrement() {
    const { infants } = this.state;
    if (infants > 0) {
      this.setState(prevState => ({
        infants: prevState.infants - 1,
        total: prevState.total - 1,
      }));
    }
  }

  renderGuestBar() {
    const { total } = this.state;
    if (total === 1) {
      return (
        <input className="guest-bar" type="text" value="1 guest" onClick={this.handleDropMenu} readOnly />
      );
    }
    return (
      <input className="guest-bar" type="text" value={`${total} guests`} onClick={this.handleDropMenu} readOnly />
    );
  }

  render() {
    const { drop, adults, children, infants } = this.state;

    return (
        <Wrapper>
          <div>
            <div className="guest-label">
              <label>
                <small>Guests</small>
              </label>
            </div>
            <div className="guest-display">
              {this.renderGuestBar()}
            </div>
            <div>
            </div>
            <div>
              <input className="booking-button" value="Book" type="button" />
              { drop ? (
              <div className="dropdown" ref={ele => this.menu = ele}>
                <div className="adults">
                  <span>Adults</span>
                  <input className="button-plus" value="-" type="button" onClick={() => this.handleAdultDecrement()} />
                  <span>{adults}</span>
                  <input className="button-minus" value="+" type="button" onClick={() => this.handleAdultIncrement()} />
                </div>
                <div className="children">
                  <span>Children</span>
                  <input className="button-plus" value="-" type="button" onClick={() => this.handleChildrenDecrement()} />
                  <span>{children}</span>
                  <input className="button-minus" value="+" type="button" onClick={() => this.handleChildrenIncrement()} />
                </div>
                <div className="infants">
                  <span>Infants</span>
                  <input className="button-plus" value="-" type="button" onClick={() => this.handleInfantDecrement()} />
                  <span>{infants}</span>
                  <input className="button-minus" value="+" type="button" onClick={() => this.handleInfantIncrement()} />
                </div>
              </div>) : null }
            </div>
          </div>
        </Wrapper>
    );
  }
}

export default Guest;
