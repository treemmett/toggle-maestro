import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from '../src/Provider';
import '@testing-library/jest-dom';

describe('the maestro provider', () => {
  test('rendering', () => {
    const { getByText } = render(<Provider>Oh hello</Provider>);
    expect(getByText('Oh hello')).toBeInTheDocument();
  });
});
