export class AuthorizationError extends Error {}

export class Session {
  constructor(public githubToken?: string) {}

  public authorize(): string {
    if (!this.githubToken) throw new AuthorizationError();

    return this.githubToken;
  }
}
