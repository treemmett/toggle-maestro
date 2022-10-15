import axios from 'axios';
import { Octokit } from 'octokit';

export class ConflictError extends Error {}

export class Manifest {
  public id?: string;

  public flags: { [flag: string]: boolean } = {};

  public createFlag(flag: string): Manifest {
    if (typeof this.flags[flag] !== 'undefined') {
      throw new ConflictError();
    }

    if (typeof this.flags[flag] === 'boolean') {
      throw new ConflictError();
    }

    this.flags[flag] = false;

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
