import { ManifestService } from '../../../entities/ManifestService';
import { BadUserInput, MissingUserInput } from '../../../utils/errors';
import { nc } from '../../../utils/nc';
import { toString } from '../../../utils/query';

export default nc().patch(async (req, res) => {
  const token = req.session.authorize();

  const flag = toString(req.query.flag);
  const { enabled } = req.body;

  if (!flag) throw new MissingUserInput();
  if (typeof enabled === 'undefined') throw new MissingUserInput();
  if (typeof enabled !== 'boolean') throw new BadUserInput();

  const manifest = await ManifestService.getManifest(token);
  manifest.updateFlag(flag, enabled);
  await manifest.write(token);
  res.send(manifest);
});
