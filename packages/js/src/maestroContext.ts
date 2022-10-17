import { createContext } from 'react';
import { Manifest } from './entities/Manifest';

export const maestroContext = createContext<Manifest>(new Manifest());
