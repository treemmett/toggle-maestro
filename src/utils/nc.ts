import { NextApiResponse } from 'next';
import NC from 'next-connect';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

export const nc = () =>
  NC<AuthenticatedRequest, NextApiResponse>({
    onNoMatch(req, res) {
      res.status(404).json({ error: 'Route not found' });
    },
  }).use(authenticate());
