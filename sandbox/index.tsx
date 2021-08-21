import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

function renderToDOM() {
  const root = document.getElementById('app');
  ReactDOM.render(<App />, root);
}
renderToDOM();
export { renderToDOM };
