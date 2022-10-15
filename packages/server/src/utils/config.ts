import { randomBytes } from 'crypto';

export class Config {
  public static readonly GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'foo';

  public static readonly JWT_KEY = process.env.JWT_SECRET
    ? Buffer.from(process.env.JWT_KEY as string, 'hex')
    : randomBytes(32);

  public static readonly NEXT_PUBLIC_GITHUB_CLIENT_ID =
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'foo';

  public static readonly NODE_ENV = process.env.NODE_ENV || 'development';
}
