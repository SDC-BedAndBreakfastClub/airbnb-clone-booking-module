import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './src/components/app.jsx';

// test file

const wrapper = shallow(<App />);

describe('A suite', function() {
  it('should render without throwing an error', function() {
    expect(wrapper.contains(<div className="foo">Bar</div>)).toBe(false);
  });

  it('should be selectable by class "foo"', function() {
    expect(wrapper.is('.foo')).toBe(false);
  });
});