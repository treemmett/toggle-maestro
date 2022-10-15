import useSWR from 'swr';
import type { Manifest } from '../entities/Manifest';
import { client } from './apiClient';

export const useManifest = () => {
  const { data, error, mutate } = useSWR('manifest', async () => {
    const response = await client.get<Manifest>('/manifest');
    return response.data;
  });

  return {
    data,
    error,
    async updateFlag(flag: string, enabled: boolean) {
      const manifest = await client.patch<Manifest>(`/manifest/${encodeURIComponent(flag)}`, {
        enabled,
      });

      await mutate(manifest.data);
    },
  };
};
