const fs = require('fs');
const path = require('path');

const sourceFile = 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs';
const destFile = 'public/pdf.worker.min.js';

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Copy the file
if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destFile);
  console.log('✅ PDF worker copied successfully!');
} else {
  console.error('❌ Source worker file not found');
}