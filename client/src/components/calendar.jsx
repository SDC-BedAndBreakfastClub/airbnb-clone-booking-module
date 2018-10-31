import React from 'react';
import dateFns from 'date-fns';
import styled from 'styled-components';

const Wrapper = styled.section`
  .calendar-header {
    display: flex;
    flex-direction: row;
  }
  .month {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    padding: 10px;
  }
  .day {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 15px;
    text-align: center;
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
  }

  renderHeader() {
    const { currentMonth } = this.state;

    return (
      <div>{dateFns.format(currentMonth, 'MMMM YYYY')}</div>
    );
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
      days.push(<div className="day names">{dateFns.format(dateFns.addDays(day, i), 'dd') + ' '}</div>);
    }

    month.push(days);

    while (day <= endOfWeek) {
      let week = [];
      for (let i = 0; i < 7; i += 1) {
        week.push(<div className="day dates">{dateFns.format(dateFns.addDays(day, i), 'D') + ' '}</div>);
      }
      day = dateFns.addDays(day, 7);
      month.push(week);
    }

    return (
      <div className="month">{month}</div>
    );
  }

  render() {
    return (
      <div>
        <Wrapper>
          <div className="calendar-header">
            <input type="button" onClick={() => this.prevMonth()} />
            {this.renderHeader()}
            <input type="button" onClick={() => this.nextMonth()} />
          </div>
          {this.renderDates()}
        </Wrapper>
      </div>
    );
  }
}

export default Calendar;
