export class Config {
  public static readonly GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'foo';

  public static readonly JWT_KEY =
    process.env.JWT_SECRET || '2fc28f7dd6daf152117bf963e4e02c83a83dd0e19d5e40a1936a67ba07034531';

  public static readonly NEXT_PUBLIC_GITHUB_CLIENT_ID =
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'foo';

  public static readonly NODE_ENV = process.env.NODE_ENV || 'development';
}
