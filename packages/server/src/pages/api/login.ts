import { SessionService } from '../../entities/SessionService';
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

export default nc()
  .get((req, res) => {
    res.send({ success: !!req.session?.githubToken });
  })
  .post(async (req, res) => {
    const session = await SessionService.login(req.body.code);
    res.send(session);
  });
