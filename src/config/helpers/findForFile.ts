import path from 'path';
import fs from 'fs';

const jsExtensions = ['js', 'jsx', 'ts', 'tsx'];

export default function findForJsFile(
  nameTemplate: string,
  pathFolder: string,
): string {
  for (let i = 0; i < jsExtensions.length; i++) {
    const filename = nameTemplate + '.' + jsExtensions[i];
    const fileFullname = path.resolve(pathFolder, filename);
    if (fs.existsSync(fileFullname)) {
      return fileFullname;
    }
  }

  throw new Error(
    'File with the name = "' +
      nameTemplate +
      '" was not found in the path ' +
      path,
  );
}
