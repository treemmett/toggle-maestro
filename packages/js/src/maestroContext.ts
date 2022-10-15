import { createContext } from 'react';
import { Manifest } from './entities/Manifest';

export const defaultManifest: Manifest = {
  flags: {},
};

export const maestroContext = createContext<Manifest>(defaultManifest);
