import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { App } from './App';

describe('App', () => {
  let rendered: ReactWrapper;

  afterEach(() => {
    rendered.unmount();
  });
  // -------------------------------------------------------
  it('should match snapshot', () => {
    rendered = mount(<App />);
    expect(rendered).toMatchSnapshot();
  });
  // -------------------------------------------------------
});
