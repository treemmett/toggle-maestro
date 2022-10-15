import axios from 'axios';
import { Session } from '../../entities/Session';
import { Config } from '../../utils/config';
import { nc } from '../../utils/nc';

export class AuthenticationError extends Error {}

export interface GitHubAuthError {
  error: string | 'bad_verification_code' | 'incorrect_client_credentials';
  error_description: string;
  error_uri: string;
}

export interface GitHubAccessToken {
  access_token: string;
  scope: string;
  token_type: string;
}

export default nc().post(async (req, res) => {
  const authResponse = await axios.post<GitHubAuthError | GitHubAccessToken>(
    'https://github.com/login/oauth/access_token',
    {
      client_id: Config.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: Config.GITHUB_CLIENT_SECRET,
      code: req.body.code,
    },
    { headers: { Accept: 'application/json' }, validateStatus: () => true }
  );

  if (authResponse.status !== 200) {
    throw new AuthenticationError();
  }

  if ('error' in authResponse.data) {
    throw new AuthenticationError(authResponse.data.error);
  }

  const session = new Session(authResponse.data.access_token);

  // TODO encrypt access key
  res.send(session);
});
