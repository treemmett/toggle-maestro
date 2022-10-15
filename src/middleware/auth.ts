import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';
import { Session } from '../entities/Session';

export interface AuthenticatedRequest extends NextApiRequest {
  session: Session;
}

export const authenticate =
  (): Middleware<AuthenticatedRequest, NextApiResponse> => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')?.[1];
    req.session = new Session(token);
    next();
  };
