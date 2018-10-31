import React from 'react';
import dateFns from 'date-fns';
import styled from 'styled-components';

const Wrapper = styled.section`
  .calendar {
    display: flex;
    flex-direction: row;
  }
  .calendar-body {
    display: flex;
    flex-direction: row;
  }
  .week {
    display: flex;
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
  }

  renderHeader() {
    const { currentMonth } = this.state;

    return (
      <p>{dateFns.format(currentMonth, 'MMMM YYYY')}</p>
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
      days.push(<span>{dateFns.format(dateFns.addDays(day, i), 'dd') + ' '}</span>);
    }

    month.push(days);

    while (day <= endOfWeek) {
      let week = [];
      for (let i = 0; i < 7; i += 1) {
        week.push(<span className="day dates">{dateFns.format(dateFns.addDays(day, i), 'D') + ' '}</span>);
      }
      day = dateFns.addDays(day, 7);
      month.push(<div className="week">{week}</div>);
    }

    return (
      <div className="month">{month}</div>
    );
  }

  render() {
    return (
      <div>
        <Wrapper>
          <div className="calendar header">
            <input type="button" onClick={() => this.prevMonth()} />
            {this.renderHeader()}
            <input type="button" onClick={() => this.nextMonth()} />
          </div>
          <div className="calendar-body">
            {this.renderDates()}
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default Calendar;
