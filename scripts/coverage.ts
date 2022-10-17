import { existsSync } from 'fs';
import { copyFile, mkdir, readdir, stat } from 'fs/promises';
import { resolve } from 'path';

async function main() {
  if (!existsSync('.nyc_output')) {
    await mkdir('.nyc_output');
  }

  const packages = await readdir('packages');
  await Promise.allSettled(
    packages.map(async (packageName) => {
      const path = resolve('packages', packageName);
      const stats = await stat(path);
      if (!stats.isDirectory()) return;

      const coverageFile = resolve(path, 'coverage', 'coverage-final.json');
      if (!existsSync(coverageFile)) return;

      await copyFile(coverageFile, resolve('.nyc_output', `${packageName}.json`));
    })
  );
}

main();
