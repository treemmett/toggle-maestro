import { ManifestService } from '../../entities/ManifestService';
import { nc } from '../../utils/nc';

export default nc()
  .get(async (req, res) => {
    const manifest = await ManifestService.getManifest(req.session.authorize());
    res.send(manifest);
  })
  .post(async (req, res) => {
    const { id } = req.body;

    const manifest = await ManifestService.getManifest(req.session.authorize());
    manifest.createFlag(id);
    await manifest.write(req.session.authorize());
    res.send(manifest);
  });
