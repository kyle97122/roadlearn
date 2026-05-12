const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, 'build');

function copyFile(src, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

function copyDirectory(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    return;
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      copyFile(srcPath, destPath);
    }
  }
}

try {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  copyFile(path.join(root, 'RoadLearn.html'), path.join(outputDir, 'RoadLearn.html'));
  copyFile(path.join(root, 'RoadLearn.jsx'), path.join(outputDir, 'RoadLearn.jsx'));
  copyDirectory(path.join(root, 'roadlearn-pwa'), path.join(outputDir, 'roadlearn-pwa'));

  console.log('Build output generated in', outputDir);
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
