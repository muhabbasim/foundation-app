#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// -----------------------------
// 🎯 Project Setup
// -----------------------------
const projectName = process.argv[2] || 'my-app';
const targetDir = path.join(process.cwd(), projectName);
const templateDir = path.join(__dirname, 'template');

// -----------------------------
// 🎨 CLI Helpers
// -----------------------------
const log = {
  info: (msg) => console.log(`\n🔹 ${msg}`),
  success: (msg) => console.log(`\n✅ ${msg}`),
  step: (msg) => console.log(`\n🚀 ${msg}`),
  loading: (msg) => console.log(`\n⏳ ${msg}`),
};

// -----------------------------
// 🚀 Start CLI
// -----------------------------
console.log('\n====================================');
console.log('   🧱 Create Foundation App CLI');
console.log('====================================\n');

log.step(`Creating project: ${projectName}`);

// -----------------------------
// 📁 Create Project Folder
// -----------------------------
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
  log.success('Project folder created');
} else {
  log.info('Folder already exists, continuing...');
}

// -----------------------------
// 📦 Copy Template
// -----------------------------
log.loading('Copying template files...');

function copyDir(src, dest) {
  fs.readdirSync(src).forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile, { recursive: true });
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

copyDir(templateDir, targetDir);

log.success('Template copied successfully');

// -----------------------------
// ✏️ Update package.json
// -----------------------------
log.loading('Configuring project...');

const packageJsonPath = path.join(targetDir, 'package.json');

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  packageJson.name = projectName;

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );

  log.success('Project configuration updated');
}

// -----------------------------
// 📦 Install dependencies
// -----------------------------
log.loading('Installing dependencies...');

try {
  execSync('npm install', {
    cwd: targetDir,
    stdio: 'inherit',
  });

  log.success('Dependencies installed');
} catch (err) {
  console.log('\n❌ Failed to install dependencies');
}

// -----------------------------
// 🎉 Finish
// -----------------------------
console.log('\n====================================');
console.log('🎉 Project created successfully!');
console.log('====================================\n');

console.log(`👉 cd ${projectName}`);
console.log('👉 npm run dev\n');

console.log('🚀 Happy coding!\n');