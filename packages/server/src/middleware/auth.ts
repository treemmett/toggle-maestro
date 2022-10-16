import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';
import { SessionService } from '../entities/SessionService';

export interface AuthenticatedRequest extends NextApiRequest {
  session: SessionService;
}

export const authenticate =
  (): Middleware<AuthenticatedRequest, NextApiResponse> => async (req, res, next) => {
    req.session = await SessionService.authenticate(req);
    await next();
  };
