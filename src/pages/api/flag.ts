import { Octokit } from 'octokit';
import { nc } from '../../utils/nc';

export class AuthorizationError extends Error {}

export default nc().post(async (req, res) => {
  const token = req.headers.authorization?.split(' ')?.[1];
  if (!token) {
    throw new AuthorizationError();
  }

  const github = new Octokit({ auth: token });
  await github.rest.gists.create({
    files: {
      flag: {
        content: JSON.stringify({
          [req.body.id]: false,
        }),
      },
    },
  });

  res.send('ok');
});
