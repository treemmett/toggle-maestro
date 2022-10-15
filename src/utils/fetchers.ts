import { plainToClass } from 'class-transformer';
import { useCallback } from 'react';
import useSWR from 'swr';
import { Manifest } from '../entities/Manifest';
import { client } from './apiClient';

export const useManifest = () => {
  const { data, error, mutate } = useSWR('manifest', async () => {
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

  return {
    data,
    error,
    updateFlag,
  };
};
