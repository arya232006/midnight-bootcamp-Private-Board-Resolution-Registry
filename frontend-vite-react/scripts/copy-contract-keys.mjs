import { mkdirSync, readdirSync, statSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function copyDirRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

const keySrc = join(root, '..', 'counter-contract', 'src', 'managed', 'counter', 'keys');
const keyDest = join(root, 'public', 'midnight', 'counter', 'keys');
const zkirSrc = join(root, '..', 'counter-contract', 'src', 'managed', 'counter', 'zkir');
const zkirDest = join(root, 'public', 'midnight', 'counter', 'zkir');

copyDirRecursive(keySrc, keyDest);
copyDirRecursive(zkirSrc, zkirDest);

console.log('Contract keys and zkir files copied successfully.');
