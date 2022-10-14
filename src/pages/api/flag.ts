import axios from 'axios';
import { Octokit } from 'octokit';
import { nc } from '../../utils/nc';

export class AuthorizationError extends Error {}
export class ConflictError extends Error {}

const MANIFEST_NAME = 'toggle-maestro-manifest.json';

export default nc().post(async (req, res) => {
  const token = req.headers.authorization?.split(' ')?.[1];
  if (!token) {
    throw new AuthorizationError();
  }

  const { id } = req.body;

  const github = new Octokit({ auth: token });

  // check if we have an existing manifest
  const gists = await github.rest.gists.list();
  const manifest = gists.data.find((gist) => gist.description === MANIFEST_NAME);
  if (!manifest || !manifest.files[MANIFEST_NAME].raw_url) {
    await github.rest.gists.create({
      description: MANIFEST_NAME,
      files: {
        [MANIFEST_NAME]: {
          content: JSON.stringify({
            [id]: false,
          }),
        },
      },
    });

    res.send('ok');
    return;
  }

  const { data } = await axios.get(manifest.files[MANIFEST_NAME].raw_url);

  if (typeof data[id] !== 'undefined') {
    throw new ConflictError();
  }

  data[id] = false;

  await github.rest.gists.update({
    files: {
      [MANIFEST_NAME]: {
        content: JSON.stringify(data),
      },
    },
    gist_id: manifest.id,
  });

  res.send('ok');
});
