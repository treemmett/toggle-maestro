export class ConflictError extends Error {}
export class FlagNotFoundError extends Error {}

export class Manifest {
  public id?: string;

  public flags: { [flag: string]: boolean } = {};

  public createFlag(flag: string): this {
    if (typeof this.flags[flag] !== 'undefined') {
      throw new ConflictError();
    }

    if (typeof this.flags[flag] === 'boolean') {
      throw new ConflictError();
    }

    this.flags[flag] = false;

    return this;
  }

  public updateFlag(flag: string, enabled: boolean): Manifest {
    if (typeof this.flags[flag] === 'undefined') {
      throw new FlagNotFoundError();
    }

    this.flags[flag] = enabled;

    return this;
  }
}
