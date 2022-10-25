import { PortablePath, ppath, xfs, npath } from '@yarnpkg/fslib';

// https://github.com/Dcard/yarn-plugins/issues/33
export default async function getDockerFilePath(
  cwd: string,
  filename = 'Dockerfile',
): Promise<PortablePath> {
  const baseDir = npath.toPortablePath(cwd);
  const path = npath.toPortablePath(filename);

  const candidate = ppath.join(baseDir, path);

  if (await xfs.existsPromise(candidate)) {
    return candidate;
  }

  throw new Error('Dockerfile is required');
}
