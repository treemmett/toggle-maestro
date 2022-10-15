import { Manifest } from '../../entities/Manifest';
import { nc } from '../../utils/nc';

export class AuthorizationError extends Error {}

export default nc().post(async (req, res) => {
  const { id } = req.body;
  if (!req.session) {
    throw new AuthorizationError();
  }

  const manifest = await Manifest.getManifest(req.session);
  manifest.createFlag(id);
  res.send(manifest);
});
