import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';

export class AuthorizationError extends Error {}

export interface AuthenticatedRequest extends NextApiRequest {
  session?: string;
}

export const authenticate =
  (): Middleware<AuthenticatedRequest, NextApiResponse> => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')?.[1];
    if (token) {
      req.session = token;
    }
    next();
  };
