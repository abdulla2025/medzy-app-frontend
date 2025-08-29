// Script to update hardcoded API URLs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const componentsDir = './src/components';
const files = readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = join(componentsDir, file);
  let content = readFileSync(filePath, 'utf8');
  
  // Replace hardcoded localhost URLs
  const updated = content.replace(/http:\/\/localhost:5000\/api/g, '${API_BASE_URL}/api');
  
  if (updated !== content) {
    // Add import if not present
    if (!updated.includes('import { API_BASE_URL }')) {
      updated = updated.replace(
        /(import React[^;]*;)/,
        '$1\nimport { API_BASE_URL } from \'../config/api.js\';'
      );
    }
    
    writeFileSync(filePath, updated);
    console.log(`Updated: ${file}`);
  }
});
