import { useContext } from 'react';
import { maestroContext } from './maestroContext';

export function useMaestro(flag: string): boolean {
  const manifest = useContext(maestroContext);

  const manifestValue = manifest.flags[flag];

  if (typeof manifestValue === 'undefined') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `Maestro - flag '${flag}' not found in manifest.\n\nThis is a development message, and will not appear in production.`
      );
    }

    return false;
  }

  return manifestValue;
}
