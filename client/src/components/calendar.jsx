import React from 'react';
import dateFns from 'date-fns';
import styled from 'styled-components';

const Wrapper = styled.section`
  font-family: 'Montserrat', sans-serif;
  .modal {
    position: relative !important;
    overflow: hidden !important;
    border-radius: 3px !important;
    transition: height 0.2s ease-in-out 0s !important;
  }
  .calendar {
    position: fixed;
    width: 20%;
    height: auto;
    top:60%;
    left:20%;
    transform: translate(-50%,-50%);
  }
  .display-block {
    display: block;
  }
  .display-none {
    display: none;
  }
  .calendar-header {
    display: flex;
    align-items: center;
    width: 50%;
  }
  .month {
    display: inline-grid;
    grid-template-columns: auto auto auto auto auto auto auto;
  }
  .day {
    background-color: rgba(125, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 10px;
    font-size: 8px;
    text-align: center;
  }
  .names {
   background-color: white;
  }
  .dates {
    cursor: pointer;
    width: 16px;
  }
  .dates:hover {
    background-color: yellow;
  }
  .change-month {
    cursor: pointer;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    height: 10px;
    width: 10px;
  }
  .month-control {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.renderDates = this.renderDates.bind(this);
    this.handleCalendarClick = this.handleCalendarClick.bind(this);
  }


  nextMonth() {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.addMonths(currentMonth, 1),
    });
  }

  prevMonth() {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.subMonths(currentMonth, 1),
    });
  }

  handleCalendarClick(event) {
    this.props.getDate(event);
    this.setState({
      selectedDate: event.target.getAttribute('value'),
    });
  }

  renderHeader() {
    const { currentMonth } = this.state;

    return (
      <div>{dateFns.format(currentMonth, 'MMMM YYYY')}</div>
    );
  }

  renderDates() {
    const { currentMonth } = this.state;
    const startOfMonth = dateFns.startOfMonth(currentMonth);
    const startOfWeek = dateFns.startOfWeek(startOfMonth);
    const endOfMonth = dateFns.endOfMonth(currentMonth);
    const endOfWeek = dateFns.endOfWeek(endOfMonth);

    let day = startOfWeek;
    let month = [];
    let days = [];

    for (let i = 0; i < 7; i += 1) {
      days.push(<div className="day names"><b>{dateFns.format(dateFns.addDays(day, i), 'dd')}</b></div>);
    }

    month.push(days);

    while (day <= endOfWeek) {
      let week = [];
      for (let i = 0; i < 7; i += 1) {
        week.push(<div className="day dates" value={dateFns.format(dateFns.addDays(day, i), 'MM/DD/YYYY')} onClick={(e) => this.handleCalendarClick(e)}>{dateFns.format(dateFns.addDays(day, i), 'D')}</div>);
      }
      day = dateFns.addDays(day, 7);
      month.push(week);
    }

    return (
      <div className="month">{month}</div>
    );
  }


  render() {
    const showHideClassname = this.props.show ? 'modal display-block' : 'modal display-none';

    return (
      <Wrapper>
        <div className={showHideClassname}>
          <div className="calendar">
            <div className="calendar-header">
              <div className="month-control">
                <div>
                  <a className="change-month" onClick={() => this.prevMonth()}>&laquo; </a>
                </div>
                {this.renderHeader()}
                <div>
                  <a className="change-month" onClick={() => this.nextMonth()}> &raquo;</a>
                </div>
              </div>
            </div>
            {this.renderDates()}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Calendar;
