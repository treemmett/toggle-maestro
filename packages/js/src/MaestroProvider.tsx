import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Manifest } from './entities/Manifest';
import { maestroContext } from './maestroContext';

export interface MaestroProviderProps extends PropsWithChildren {
  accessToken: string;
}

export const MaestroProvider: FC<MaestroProviderProps> = ({ accessToken, children }) => {
  const [manifest, setManifest] = useState(new Manifest());

  const loadManifest = useCallback(async () => {
    const m: Manifest = await fetch('http://localhost:3000/api/manifest', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }).then((r) => r.json());

    setManifest(m);
  }, [accessToken]);

  useEffect(() => {
    loadManifest();
  }, [loadManifest]);

  return <maestroContext.Provider value={manifest}>{children}</maestroContext.Provider>;
};
