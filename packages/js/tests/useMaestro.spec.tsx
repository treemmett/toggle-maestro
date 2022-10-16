import { render } from '@testing-library/react';
import React, { FC } from 'react';
import { Provider } from '../src/Provider';
import '@testing-library/jest-dom';
import { useMaestro } from '../src/useMaestro';

describe('useMaestro hook', () => {
  test('renders true flags', () => {
    const C: FC = () => {
      const enabled = useMaestro('bar');

      return <Provider>{enabled ? <div>It's true</div> : <div>It's false</div>}</Provider>;
    };
    const { getByText } = render(<C />);
    expect(getByText("It's true")).toBeInTheDocument();
  });

  test('renders false flags', () => {
    const C: FC = () => {
      const enabled = useMaestro('foo');

      return <Provider>{enabled ? <div>It's true</div> : <div>It's false</div>}</Provider>;
    };
    const { getByText } = render(<C />);
    expect(getByText("It's false")).toBeInTheDocument();
  });
});
