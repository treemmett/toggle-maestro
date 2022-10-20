import { Manifest } from '../entities/Manifest';

declare global {
  export interface Window {
    __MAESTRO_EXTENSION_MANIFEST__?: Manifest;
  }
}
