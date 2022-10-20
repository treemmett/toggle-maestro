import React, { FC } from 'react';
import '@testing-library/jest-dom';
import { useMaestro } from '../src/useMaestro';
import { render, waitFor } from './test-util';

describe('useMaestro hook', () => {
  it('renders true flags', async () => {
    const C: FC = () => {
      const enabled = useMaestro('feature-2');

      return enabled ? <div>It's true</div> : <div>It's false</div>;
    };
    const { getByText } = render(<C />);
    await waitFor(() => expect(getByText("It's true")).toBeInTheDocument());
  });

  it('renders false flags', async () => {
    const C: FC = () => {
      const enabled = useMaestro('feature-1');

      return enabled ? <div>It's true</div> : <div>It's false</div>;
    };
    const { getByText } = render(<C />);
    await waitFor(() => expect(getByText("It's false")).toBeInTheDocument());
  });

  it('displays missing flag message', async () => {
    const logSpy = jest.spyOn(console, 'warn');
    const C: FC = () => {
      const enabled = useMaestro('foobar');

      return enabled ? <div>It's true</div> : <div>It's false</div>;
    };
    const { getByText } = render(<C />);
    await waitFor(() => expect(getByText("It's false")).toBeInTheDocument());
    expect(logSpy).toHaveBeenCalledWith(
      `Maestro - flag 'foobar' not found in manifest.\n\nThis is a development message, and will not appear in production.`
    );
  });
});
