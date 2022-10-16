import { render } from '@testing-library/react';
import React, { FC } from 'react';
import { Provider } from '../src/Provider';
import '@testing-library/jest-dom';
import { useMaestro } from '../src/useMaestro';

describe('useMaestro hook', () => {
  it('renders true flags', () => {
    const C: FC = () => {
      const enabled = useMaestro('bar');

      return <Provider>{enabled ? <div>It's true</div> : <div>It's false</div>}</Provider>;
    };
    const { getByText } = render(<C />);
    expect(getByText("It's true")).toBeInTheDocument();
  });

  it('renders false flags', () => {
    const C: FC = () => {
      const enabled = useMaestro('foo');

      return <Provider>{enabled ? <div>It's true</div> : <div>It's false</div>}</Provider>;
    };
    const { getByText } = render(<C />);
    expect(getByText("It's false")).toBeInTheDocument();
  });

  it('displays missing flag message', () => {
    const logSpy = jest.spyOn(console, 'warn');
    const C: FC = () => {
      const enabled = useMaestro('foobar');

      return <Provider>{enabled ? <div>It's true</div> : <div>It's false</div>}</Provider>;
    };
    const { getByText } = render(<C />);
    expect(getByText("It's false")).toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith(
      `Maestro - flag 'foobar' not found in manifest.\n\nThis is a development message, and will not appear in production.`
    );
  });
});
