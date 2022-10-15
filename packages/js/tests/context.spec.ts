import { maestroContext } from '../src/maestroContext';

describe('the maestro context', () => {
  test('happy path', () => {
    expect(maestroContext).toBeDefined();
  });
});
