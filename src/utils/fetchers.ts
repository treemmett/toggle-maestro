import useSWR from 'swr';
import type { Manifest } from '../entities/Manifest';
import { client } from './apiClient';

const manifestFetcher = async () => {
  const { data } = await client.get<Manifest>('/manifest');
  return data;
};

export const useManifest = () => useSWR('manifest', manifestFetcher);
