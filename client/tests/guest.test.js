import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Guest from '../src/components/guest.jsx';

// test file

describe('Guest component', () => {
  it('should render without throwing an error', function() {
    expect(shallow(<Guest />).exists()).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Guest />).find('.guest-display').length).toBe(1);
  });

  test("open guest menu", () => {
  	const wrapper = shallow(<Guest max={4} />);
  	wrapper.find('.guest-bar').simulate('click');

  	expect(wrapper.find('.dropdown').exists()).toBe(true);
  });

  test("increment adult count", () => {
  	const wrapper = shallow(<Guest max={4} />);
  	wrapper.find('.guest-bar').simulate('click');
  	wrapper.find('.adults .button-plus').simulate('click');

  	expect(wrapper.find('.guest-bar').props().value).toEqual('2 guests');
  });

  test("decrement adult count", () => {
  	const wrapper = shallow(<Guest max={4} />);
  	wrapper.find('.guest-bar').simulate('click');
  	wrapper.find('.adults .button-plus').simulate('click');
  	wrapper.find('.adults .button-minus').simulate('click');

  	expect(wrapper.find('.guest-bar').props().value).toEqual('1 guest');
  });

  test("increment children count", () => {
  	const wrapper = shallow(<Guest max={4} />);
  	wrapper.find('.guest-bar').simulate('click');
  	wrapper.find('.adults .button-plus').simulate('click');
  	wrapper.find('.children .button-plus').simulate('click');

  	expect(wrapper.find('.guest-bar').props().value).toEqual('3 guests');
  });

  test("decrement adult count", () => {
  	const wrapper = shallow(<Guest max={4} />);
  	wrapper.find('.guest-bar').simulate('click');
  	wrapper.find('.children .button-plus').simulate('click');
  	wrapper.find('.children .button-minus').simulate('click');

  	expect(wrapper.find('.guest-bar').props().value).toEqual('1 guest');
  });

  test("increment adult count", () => {
  	const wrapper = shallow(<Guest max={4} />);
  	wrapper.find('.guest-bar').simulate('click');
  	wrapper.find('.adults .button-plus').simulate('click');
  	wrapper.find('.infants .button-plus').simulate('click');
  	wrapper.find('.children .button-plus').simulate('click');

  	expect(wrapper.find('.guest-bar').props().value).toEqual('4 guests');
  });

  test("decrement adult count", () => {
  	const wrapper = shallow(<Guest max={4} />);
  	wrapper.find('.guest-bar').simulate('click');
  	wrapper.find('.infants .button-plus').simulate('click');
  	wrapper.find('.infants .button-minus').simulate('click');

  	expect(wrapper.find('.guest-bar').props().value).toEqual('1 guest');
  });
});
