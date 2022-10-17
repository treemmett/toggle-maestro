import { EncryptJWT, jwtDecrypt } from 'jose';
import { NextApiRequest } from 'next';
import { OAuthApp } from 'octokit';
import { Config } from '../utils/config';
import { AuthorizationError } from '../utils/errors';
import { Session } from './Session';

export class SessionService extends Session {
  public githubToken?: string;

  public authorize(): string {
    if (!this.githubToken) throw new AuthorizationError();

    return this.githubToken;
  }

  public static async login(code: string): Promise<Session> {
    const github = new OAuthApp({
      clientId: Config.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
    });
    const auth = await github.createToken({ code });

    const token = await new EncryptJWT({
      accessToken: auth.authentication.token,
    })
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .encrypt(Buffer.from(Config.JWT_KEY, 'hex'));

    return new Session(token);
  }

  public static async authenticate(req: NextApiRequest): Promise<SessionService> {
    const session = new SessionService();

    try {
      const bearer = req.headers.authorization?.split(' ');

      if (!bearer || bearer[0]?.toLowerCase() !== 'bearer' || typeof bearer[1] !== 'string') {
        return session;
      }

      const [, token] = bearer;
      const jwt = await jwtDecrypt(token, Buffer.from(Config.JWT_KEY, 'hex'));
      session.accessToken = token;
      session.githubToken = jwt.payload.accessToken as string;
    } catch {
      // shrug
    }

    return session;
  }
}
