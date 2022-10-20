import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Manifest } from './entities/Manifest';
import { maestroContext } from './maestroContext';

export interface MaestroProviderProps extends PropsWithChildren {
  accessToken: string;
  /**
   * Broadcast manifest load, and accept global event listeners
   */
  enableExtension?: boolean;
  /**
   * Hostname to Maestro API server
   * @default http://localhost:3000/api
   */
  hostname?: string;
}

export const MaestroProvider: FC<MaestroProviderProps> = ({
  accessToken,
  enableExtension,
  children,
  hostname = 'http://localhost:3000/api',
}) => {
  const [manifest, setManifest] = useState(new Manifest());

  useEffect(() => {
    if (enableExtension) {
      window.__MAESTRO_EXTENSION_MANIFEST__ = manifest;
    }
  }, [enableExtension, manifest]);

  const loadManifest = useCallback(async () => {
    const response = await fetch(`${hostname}/manifest`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }).catch(() => ({ error: true }));

    if ('error' in response) {
      console.error('Network error connecting to Maestro');
      return;
    }

    if (response.status >= 300) {
      console.error('Maestro key invalid');
      return;
    }

    const m: Manifest = await response.json();

    setManifest(m);
  }, [accessToken, hostname]);

  useEffect(() => {
    loadManifest();
  }, [loadManifest]);

  return <maestroContext.Provider value={manifest}>{children}</maestroContext.Provider>;
};
