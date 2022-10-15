import { ManifestService } from '../../entities/ManifestService';
import { nc } from '../../utils/nc';

export class AuthorizationError extends Error {}

export default nc()
  .get(async (req, res) => {
    if (!req.session) {
      throw new AuthorizationError();
    }

    const manifest = await ManifestService.getManifest(req.session);
    res.send(manifest);
  })
  .post(async (req, res) => {
    const { id } = req.body;
    if (!req.session) {
      throw new AuthorizationError();
    }

    const manifest = await ManifestService.getManifest(req.session);
    manifest.createFlag(id);
    await manifest.write(req.session);
    res.send(manifest);
  });
