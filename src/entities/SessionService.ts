import { NextApiRequest } from 'next';
import { Session } from './Session';

export class AuthorizationError extends Error {}

export class SessionService extends Session {
  public githubToken?: string;

  constructor(req: NextApiRequest) {
    super();
    const bearer = req.headers.authorization?.split(' ');

    if (!bearer || bearer[0]?.toLowerCase() !== 'bearer' || typeof bearer[1] !== 'string') {
      return;
    }

    const [, token] = bearer;
    this.accessToken = token;
    this.githubToken = token;
  }

  public authorize(): string {
    if (!this.githubToken) throw new AuthorizationError();

    return this.githubToken;
  }
}
