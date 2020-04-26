import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../App';

function renderStaticApp(parentDom: HTMLElement) {
  ReactDOM.render(<App />, parentDom);
}

// tslint:disable-next-line: no-string-literal
window['StaticApp'] = renderStaticApp;
