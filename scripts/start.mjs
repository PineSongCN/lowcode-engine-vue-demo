import fs from 'fs';
import path from 'path';
import { execaCommand } from 'execa';

const { resolve } = path;
const enginePath = resolve('./node_modules/@alilc/lowcode-engine/dist');
const engineExtPath = resolve('./node_modules/@alilc/lowcode-engine-ext/dist');
const renderPath = resolve('./node_modules/@knxcloud/lowcode-vue-renderer/dist');
const simulatorPath = resolve(
  './node_modules/@knxcloud/lowcode-vue-simulator-renderer/dist'
);

const files = [
  `${enginePath}/css/engine-core.css`,
  `${enginePath}/js/engine-core.js`,
  `${engineExtPath}/css/engine-ext.css`,
  `${engineExtPath}/js/engine-ext.js`,
  `${renderPath}/vue-renderer.js`,
  `${simulatorPath}/vue-simulator-renderer.css`,
  `${simulatorPath}/vue-simulator-renderer.js`,
];
const localPath = resolve('./public/js');
for (const filePath of files) {
  const tmp = typeof filePath === 'string' ? [filePath, filePath] : filePath;
  let [source, target] = tmp;
  const filename = target.split('/').slice(-1)[0];
  target = resolve(localPath, filename);
  fs.copyFileSync(source, target);
}

execaCommand(`build-scripts start --disable-reload --port 5557`, {
  stdio: 'inherit',
  encoding: 'utf-8',
});
