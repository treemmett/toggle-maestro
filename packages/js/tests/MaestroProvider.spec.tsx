import { render } from '@testing-library/react';
import { MaestroProvider } from '../src/MaestroProvider';
import '@testing-library/jest-dom';

describe('the maestro provider', () => {
  test('rendering', () => {
    const { getByText } = render(<MaestroProvider>Oh hello</MaestroProvider>);
    expect(getByText('Oh hello')).toBeInTheDocument();
  });
});
