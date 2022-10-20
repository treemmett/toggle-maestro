import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
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
    const m: Manifest = await fetch(`${hostname}/manifest`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }).then((r) => r.json());

    setManifest(m);
  }, [accessToken, hostname]);

  useEffect(() => {
    loadManifest();
  }, [loadManifest]);

  return <maestroContext.Provider value={manifest}>{children}</maestroContext.Provider>;
};
