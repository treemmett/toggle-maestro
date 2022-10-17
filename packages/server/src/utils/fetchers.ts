import { plainToClass } from 'class-transformer';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Manifest } from '../entities/Manifest';
import { Session } from '../entities/Session';
import { client } from './apiClient';
import { Config } from './config';
import { APIError } from './errors';

export const useManifest = () => {
  const { data, error, mutate } = useSWR<Manifest, APIError>('manifest', async () => {
    const response = await client.get<Manifest>('/manifest');
    return plainToClass(Manifest, response.data);
  });

  const updateFlag = useCallback(
    async (flag: string, enabled: boolean) => {
      const clone = plainToClass(Manifest, data);
      const optimisticData = clone.updateFlag(flag, enabled);

      await mutate(
        async () => {
          const updated = await client.patch<Manifest>(`/manifest/${encodeURIComponent(flag)}`, {
            enabled,
          });
          return plainToClass(Manifest, updated.data);
        },
        {
          optimisticData,
          revalidate: false,
          rollbackOnError: true,
        }
      );
    },
    [data, mutate]
  );

  const addFlag = useCallback(
    async (name: string) => {
      const clone = plainToClass(Manifest, data);
      const optimisticData = clone.createFlag(name);

      await mutate(
        async () => {
          const updated = await client.post('/manifest', { id: name });
          return plainToClass(Manifest, updated.data);
        },
        {
          optimisticData,
          revalidate: false,
          rollbackOnError: true,
        }
      );
    },
    [data, mutate]
  );

  return {
    addFlag,
    data,
    error,
    updateFlag,
  };
};

export const useSession = () => {
  const [session, setSession] = useState(new Session());
  const [authenticating, setAuthenticating] = useState(true);

  const checkSession = useCallback(async () => {
    setAuthenticating(true);
    const token = localStorage.getItem('token');
    if (token) {
      const { data } = await client.get('/login');
      if (data.success) {
        setSession(new Session(token));
      } else {
        localStorage.removeItem('token');
      }
    }
    setAuthenticating(false);
  }, []);

  const login = useCallback(() => {
    if (authenticating) return;
    setAuthenticating(true);
    localStorage.removeItem('token');

    const popup = window.open(
      `https://github.com/login/oauth/authorize?client_id=${Config.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=gist`,
      'oauth',
      `popup,width=500,height=750,left=${global.screen.width / 2 - 250}`
    );

    const intervalId = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(intervalId);
        setAuthenticating(false);
        checkSession();
      }
    }, 100);
  }, [authenticating, checkSession]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return {
    authenticating,
    login,
    session,
  };
};
