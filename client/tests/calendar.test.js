import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Calendar from '../src/components/calendar.jsx';
import dateFns from 'date-fns';


// test file

describe('Calendar component', () => {
  it('should render without throwing an error', function() {
    expect(shallow(<Calendar />).find(".modal").exists()).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Calendar />).find('.calendar').length).toBe(1);
  });

  test("record dates", () => {
  	const mockGetAttribute = jest.fn().mockReturnValue('12/30/1997')
  	const mockEvent = {target: {getAttribute: mockGetAttribute}}
  	const wrapper = shallow(<Calendar show={false} getDate={() => {}} />);
  	wrapper.setState({ selectedDate: '09/25/2007' })
  	wrapper.instance().handleCalendarClick(mockEvent);
  	expect(wrapper.state('selectedDate')).toBe('12/30/1997');
  });
  
  test("change to next month", () => {
  	const today = new Date();
  	const wrapper = shallow(<Calendar show={false} getDate={() => {}} />);
  	wrapper.setState({ currentMonth: today })
  	wrapper.instance().nextMonth();
  	expect(dateFns.getMonth(wrapper.state('currentMonth'))).toBe(dateFns.getMonth(dateFns.addMonths(today, 1)));
  });

  test("change to previous month", () => {
  	const today = new Date();
  	const wrapper = shallow(<Calendar show={false} getDate={() => {}} />);
  	wrapper.setState({ currentMonth: today })
  	wrapper.instance().prevMonth();
  	expect(dateFns.getMonth(wrapper.state('currentMonth'))).toBe(dateFns.getMonth(dateFns.subMonths(today, 1)));
  });

  test("click should be functional", () => {
  	const today = new Date();
  	const wrapper = mount(<Calendar show={true} getDate={() => {}} />);
  	wrapper.find('.prev').simulate('click');
  	wrapper.find('.prev').simulate('click');
  	wrapper.find('.next').simulate('click');

  	expect(dateFns.getMonth(wrapper.state('currentMonth'))).toBe(dateFns.getMonth(dateFns.subMonths(today, 1)));
  });

});
