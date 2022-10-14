import { NextApiRequest, NextApiResponse } from 'next';
import NC from 'next-connect';

export const nc = () =>
  NC<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
      res.status(404).json({ error: 'Route not found' });
    },
  });
