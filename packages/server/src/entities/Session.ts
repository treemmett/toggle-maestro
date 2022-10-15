import { ulid } from 'ulid';

export class Session {
  public id = ulid();

  constructor(public accessToken?: string) {}
}
