import { FC, PropsWithChildren, useState } from 'react';
import { defaultManifest, maestroContext } from './maestroContext';

export const MaestroProvider: FC<PropsWithChildren> = ({ children }) => {
  const [manifest] = useState(defaultManifest);

  return <maestroContext.Provider value={manifest}>{children}</maestroContext.Provider>;
};
