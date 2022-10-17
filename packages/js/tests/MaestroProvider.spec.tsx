import { render, waitFor } from '@testing-library/react';
import { MaestroProvider } from '../src/MaestroProvider';
import '@testing-library/jest-dom';

describe('the maestro provider', () => {
  test('rendering', async () => {
    const { getByText } = render(
      <MaestroProvider accessToken={process.env.ACCESS_TOKEN as string}>Oh hello</MaestroProvider>
    );
    await waitFor(() => expect(getByText('Oh hello')).toBeInTheDocument());
  });
});
