#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// project name from command
const projectName = process.argv[2] || 'my-app';

// // where to create project
const targetDir = path.join(process.cwd(), projectName);

// // template location
const templateDir = path.join(__dirname, 'template');

// create project folder
fs.mkdirSync(targetDir);

// function to copy everything
function copyDir(src, dest) {
  fs.readdirSync(src).forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile);
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

// copy files
copyDir(templateDir, targetDir);

// change project name
const packageJsonPath = path.join(targetDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.name = projectName;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// 3. 👉 INSTALL DEPENDENCIES HERE
const { execSync } = require('child_process');

console.log("📦 Installing dependencies...");
execSync('npm install', {
  cwd: targetDir,
  stdio: 'inherit',
});


console.log(`✅ Project created: ${projectName}`);
console.log(`👉 cd ${projectName}`);
console.log(`👉 npm install`);
console.log(`👉 npm run dev`);
