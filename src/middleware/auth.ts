import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';
import { SessionService } from '../entities/SessionService';

export interface AuthenticatedRequest extends NextApiRequest {
  session: SessionService;
}

export const authenticate =
  (): Middleware<AuthenticatedRequest, NextApiResponse> => (req, res, next) => {
    req.session = new SessionService(req);
    next();
  };
