import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../src/components/app.jsx';

// test file

describe('App component', function() {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).find(".booking-module").exists()).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<App />).find('.dates-label').length).toBe(1);
  });

  test("display new start date", () => {
  	const mockGetAttribute = jest.fn().mockReturnValue('12/30/1997')
  	const mockEvent = {target: {getAttribute: mockGetAttribute}}
  	const wrapper = shallow(<App />);
  	wrapper.instance().handleStartDate(mockEvent);
  	expect(wrapper.state('start')).toBe('12/30/1997');
  });

  test("display new end date", () => {
  	const mockGetAttribute = jest.fn().mockReturnValue('12/30/1997')
  	const mockEvent = {target: {getAttribute: mockGetAttribute}}
  	const wrapper = shallow(<App />);
  	wrapper.instance().handleEndDate(mockEvent);
  	expect(wrapper.state('end')).toBe('12/30/1997');
  });

  test("make stars", () => {
  	const wrapper = shallow(<App />);
  	wrapper.setState({ data: [{ _id:"5bdb962f4f4e394491368e53", pricing :330, average_review :2.5034758631679264, total_reviews: 146, max_guests: 4, __v: 0 }] })
  	expect(wrapper.find(".star-ratings").exists()).toBe(true);
  });

  test("show price", () => {
  	const wrapper = shallow(<App />);
  	wrapper.setState({ data: [{ _id:"5bdb962f4f4e394491368e53", pricing :330, average_review :2.5034758631679264, total_reviews: 146, max_guests: 4, __v: 0 }] })
  	expect(wrapper.find(".listing-price").exists()).toBe(true);
  });

  test("show one calendar at a time", () => {
  	const wrapper = shallow(<App />);
  	wrapper.setState({ data: [{ _id:"5bdb962f4f4e394491368e53", pricing :330, average_review :2.5034758631679264, total_reviews: 146, max_guests: 4, __v: 0 }] })
  	wrapper.instance().showCalendarStart();
  	expect(wrapper.state("showCalStart")).toBe(true);
  	expect(wrapper.state("showCalEnd")).toBe(false);
  });

});
