import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Calendar from '../src/components/calendar.jsx';

// test file

describe('Calendar component', () => {
  it('should render without throwing an error', function() {
    expect(shallow(<Calendar />).find(".modal").exists()).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Calendar />).find('.calendar').length).toBe(1);
  });
});
