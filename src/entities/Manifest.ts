import axios from 'axios';
import { Octokit } from 'octokit';

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

  public async write(token: string): Promise<this> {
    const github = new Octokit({ auth: token });

    if (this.id) {
      await github.rest.gists.update({
        files: {
          [Manifest.MANIFEST_NAME]: {
            content: JSON.stringify(this.flags),
          },
        },
        gist_id: this.id,
      });
    } else {
      const created = await github.rest.gists.create({
        description: Manifest.MANIFEST_NAME,
        files: {
          [Manifest.MANIFEST_NAME]: {
            content: JSON.stringify(this.flags),
          },
        },
      });
      this.id = created.data.id;
    }

    return this;
  }

  public updateFlag(flag: string, enabled: boolean): Manifest {
    if (typeof this.flags[flag] === 'undefined') {
      throw new FlagNotFoundError();
    }

    this.flags[flag] = enabled;

    return this;
  }

  public static async getManifest(token: string): Promise<Manifest> {
    const github = new Octokit({ auth: token });

    // check if we have an existing manifest
    const gists = await github.rest.gists.list();
    const manifest = gists.data.find((gist) => gist.description === this.MANIFEST_NAME);
    const manifestUrl = manifest?.files?.[this.MANIFEST_NAME]?.raw_url;
    if (!manifestUrl) {
      return new Manifest();
    }

    const { data } = await axios.get(manifestUrl);
    const m = new Manifest();
    m.id = manifest.id;
    m.flags = data;
    return m;
  }

  public static MANIFEST_NAME = 'toggle-maestro-manifest.json';
}
