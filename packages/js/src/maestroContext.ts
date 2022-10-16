import { createContext } from 'react';
import { Manifest } from './entities/Manifest';

export const defaultManifest: Manifest = {
  flags: {
    bar: true,
    foo: false,
  },
};

export const maestroContext = createContext<Manifest>(defaultManifest);
