import axios from 'axios';
import { Octokit } from 'octokit';
import { Manifest } from './Manifest';

export class ManifestService extends Manifest {
  public static async getManifest(token: string): Promise<ManifestService> {
    const github = new Octokit({ auth: token });

    // check if we have an existing manifest
    const gists = await github.rest.gists.list();
    const manifest = gists.data.find((gist) => gist.description === this.MANIFEST_NAME);
    const manifestUrl = manifest?.files?.[this.MANIFEST_NAME]?.raw_url;
    if (!manifestUrl) {
      return new ManifestService();
    }

    const { data } = await axios.get(manifestUrl);
    const m = new ManifestService();
    m.id = manifest.id;
    m.flags = data;
    return m;
  }

  public async write(token: string): Promise<this> {
    const github = new Octokit({ auth: token });

    if (this.id) {
      await github.rest.gists.update({
        files: {
          [ManifestService.MANIFEST_NAME]: {
            content: JSON.stringify(this.flags),
          },
        },
        gist_id: this.id,
      });
    } else {
      const created = await github.rest.gists.create({
        description: ManifestService.MANIFEST_NAME,
        files: {
          [ManifestService.MANIFEST_NAME]: {
            content: JSON.stringify(this.flags),
          },
        },
      });
      this.id = created.data.id;
    }

    return this;
  }

  public static MANIFEST_NAME = 'toggle-maestro-manifest.json';
}
