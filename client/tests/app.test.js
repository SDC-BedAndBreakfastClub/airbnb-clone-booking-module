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
});
