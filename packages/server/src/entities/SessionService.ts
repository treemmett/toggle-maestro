import { NextApiRequest } from 'next';
import { OAuthApp } from 'octokit';
import { Config } from '../utils/config';
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

  public static async login(code: string): Promise<Session> {
    const github = new OAuthApp({
      clientId: Config.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
    });
    const token = await github.createToken({ code });
    return new Session(token.authentication.token);
  }
}
