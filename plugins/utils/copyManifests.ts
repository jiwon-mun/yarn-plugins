import { PortablePath, ppath, xfs } from '@yarnpkg/fslib';
import { Workspace, Manifest, Report } from '@yarnpkg/core';

export default async function copyManifests({
  destination,
  workspaces,
  report,
}: {
  destination: PortablePath;
  workspaces: Workspace[];
  report: Report;
}): Promise<void> {
  for (const ws of workspaces) {
    const path = ppath.join(ws.relativeCwd, Manifest.fileName);
    const dest = ppath.join(destination, path);
    const data = {};


    ws.manifest.exportTo(data);
    
    //@ts-ignore
    // delete data['devDependencies']


    report.reportInfo(null, path);
    await xfs.mkdirpPromise(ppath.dirname(dest));
    const r = await xfs.writeJsonPromise(dest, data);
  }
}
