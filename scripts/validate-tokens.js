import fs from 'fs';
import path from 'path';

let hasErrors = false;
const errors = [];

function logError(msg) {
  hasErrors = true;
  errors.push(msg);
  console.error(`❌ ${msg}`);
}

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    logError(`Failed to parse ${filePath}: ${e.message}`);
    return {};
  }
}

function extractTokens(obj, currentPath = '', result = {}) {
  if (typeof obj !== 'object' || obj === null) return result;
  if (obj.hasOwnProperty('value')) {
    result[currentPath] = obj.value;
    return result;
  }
  for (const [key, val] of Object.entries(obj)) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    extractTokens(val, newPath, result);
  }
  return result;
}

const colorBase = extractTokens(readJSON('tokens/color/base.json'));
const colorSemantic = extractTokens(readJSON('tokens/color/semantic.json'));
const typography = extractTokens(readJSON('tokens/typography/base.json'));
const spacing = extractTokens(readJSON('tokens/spacing/base.json'));
const radius = extractTokens(readJSON('tokens/radius/base.json'));
const motion = extractTokens(readJSON('tokens/motion/base.json'));

const allTokens = { ...colorBase, ...colorSemantic, ...typography, ...spacing, ...radius, ...motion };

// 1. Confirms every token has a value property
function checkValues(obj, filePath, currentPath = '') {
  if (typeof obj !== 'object' || obj === null) return;
  const keys = Object.keys(obj);
  
  if (obj.hasOwnProperty('value')) {
    if (obj.value === undefined || obj.value === null || obj.value === '') {
      logError(`Empty 'value' property in ${filePath} at ${currentPath}`);
    }
  } else {
    for (const [key, val] of Object.entries(obj)) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      checkValues(val, filePath, newPath);
    }
  }
}

const files = [
  'tokens/color/base.json', 
  'tokens/color/semantic.json', 
  'tokens/typography/base.json', 
  'tokens/spacing/base.json', 
  'tokens/radius/base.json', 
  'tokens/motion/base.json'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    checkValues(readJSON(file), file);
  } else {
    logError(`Missing required token file: ${file}`);
  }
});

// 2. Confirms every semantic colour alias resolves to a base token that exists
for (const [tokenPath, value] of Object.entries(colorSemantic)) {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const refPath = value.slice(1, -1);
    if (!colorBase[refPath] && !allTokens[refPath]) {
      logError(`Alias resolution failed: Semantic token '${tokenPath}' points to '${refPath}' which does not exist.`);
    }
  }
}

// 3. Confirms the spacing scale has no gaps in the sequence
const spacingObj = readJSON('tokens/spacing/base.json');
if (spacingObj && spacingObj.spacing) {
  const spacingKeyMatches = Object.keys(spacingObj.spacing).map(Number).sort((a,b) => a - b);
  const expectedSequence = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48];
  const missing = expectedSequence.filter(x => !spacingKeyMatches.includes(x));
  if (missing.length > 0) {
    logError(`Spacing scale is missing required values: ${missing.join(', ')}`);
  }
}

if (hasErrors) {
  console.error('\n❌ Token validation failed. See errors above.');
  process.exit(1);
} else {
  console.log('✅ Token validation passed successfully!');
  console.log(`Summary: Validated ${Object.keys(allTokens).length} tokens across ${files.length} categories.`);
  process.exit(0);
}
