import cors from 'cors';
import { NextApiResponse } from 'next';
import NC from 'next-connect';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { APIError } from './errors';

export const nc = () =>
  NC<AuthenticatedRequest, NextApiResponse>({
    onError(err: APIError, req, res) {
      console.error(err);

      if (!(err instanceof APIError)) {
        res.status(500).send({
          error: {
            code: 'UnknownError',
            message: 'Something went wrong',
          },
        });
        return;
      }

      res.status(err.status).send({
        error: {
          code: err.constructor.name,
          message: err.message,
        },
      });
    },
    onNoMatch(req, res) {
      res.status(404).json({ error: 'Route not found' });
    },
  })
    .use(cors())
    .use(authenticate());
