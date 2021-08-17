import React from 'react';
import { App } from './App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('testing ConfigApp', () => {
  render(<App />);

  expect(screen.getByTestId('config-number')).toHaveTextContent(
    'ParamNumber = 7',
  );

  expect(screen.getByTestId('config-text')).toHaveTextContent(
    'ParamText = Text from env',
  );
});

test('testing DecoratorApp', () => {
  render(<App />);

  expect(screen.getByTestId('decorator')).toHaveTextContent('From Decorator');
});
