import { Manifest } from '../entities/Manifest';

export declare global {
  interface Window {
    __MAESTRO_EXTENSION_MANIFEST__?: Manifest;
  }
}
