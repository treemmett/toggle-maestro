import cors from 'cors';
import { NextApiResponse } from 'next';
import NC from 'next-connect';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

export const nc = () =>
  NC<AuthenticatedRequest, NextApiResponse>({
    onError(err, req, res) {
      console.error(err);
      res.status(500).send({ err });
    },
    onNoMatch(req, res) {
      res.status(404).json({ error: 'Route not found' });
    },
  })
    .use(cors())
    .use(authenticate());
