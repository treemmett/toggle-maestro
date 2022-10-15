import { Manifest } from '../../entities/Manifest';
import { nc } from '../../utils/nc';

export class AuthorizationError extends Error {}

export default nc().post(async (req, res) => {
  const { id } = req.body;
  const token = req.headers.authorization?.split(' ')?.[1];
  if (!token) {
    throw new AuthorizationError();
  }

  const manifest = await Manifest.getManifest(token);
  manifest.createFlag(id);
  res.send(manifest);
});
