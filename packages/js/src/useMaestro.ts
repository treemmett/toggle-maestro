import { useContext } from 'react';
import { maestroContext } from './maestroContext';

export function useMaestro(flag: string): boolean {
  const manifest = useContext(maestroContext);

  return manifest.flags[flag] ?? false;
}
