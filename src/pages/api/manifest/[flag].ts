import { ManifestService } from '../../../entities/ManifestService';
import { AuthorizationError } from '../../../middleware/auth';
import { nc } from '../../../utils/nc';
import { toString } from '../../../utils/query';

export class BadUserInput extends Error {}

export default nc().patch(async (req, res) => {
  if (!req.session) {
    throw new AuthorizationError();
  }

  const flag = toString(req.query.flag);
  const { enabled } = req.body;

  if (!flag) throw new BadUserInput();
  if (typeof enabled !== 'boolean') throw new BadUserInput();

  const manifest = await ManifestService.getManifest(req.session);
  manifest.updateFlag(flag, enabled);
  await manifest.write(req.session);
  res.send(manifest);
});
