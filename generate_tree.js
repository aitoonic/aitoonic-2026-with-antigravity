const fs = require('fs');
const path = require('path');

const excludeDirs = ['node_modules', '.git'];

function getStructure(dir, prefix = '') {
    let result = '';
    try {
        const items = fs.readdirSync(dir);

        // Sort items: directories first, then files
        items.sort((a, b) => {
            const aPath = path.join(dir, a);
            const bPath = path.join(dir, b);
            const aStat = fs.statSync(aPath);
            const bStat = fs.statSync(bPath);

            if (aStat.isDirectory() && !bStat.isDirectory()) return -1;
            if (!aStat.isDirectory() && bStat.isDirectory()) return 1;
            return a.localeCompare(b);
        });

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (excludeDirs.includes(item)) continue;

            const itemPath = path.join(dir, item);
            const stats = fs.statSync(itemPath);
            const isLast = i === items.length - 1;

            // Use simpler indentation for clarity or standard tree style
            // result += prefix + (isLast ? '└── ' : '├── ') + item + '\n';
            // For deep nesting, simpler indentation might be better copy-paste
            result += prefix + item + (stats.isDirectory() ? '/' : '') + '\n';

            if (stats.isDirectory()) {
                // Recurse
                // result += getStructure(itemPath, prefix + (isLast ? '    ' : '│   '));
                result += getStructure(itemPath, prefix + '    ');
            }
        }
    } catch (e) {
        result += prefix + `[Error reading directory: ${e.message}]\n`;
    }
    return result;
}

// Find the project directory
const cwd = process.cwd();
const files = fs.readdirSync(cwd);
let targetDir = cwd;

// If we are in the root and 'nextjs14-aitoonic-done...' exists, go in there
for (const f of files) {
    if (f.startsWith('nextjs14-aitoonic-done') && fs.statSync(f).isDirectory()) {
        targetDir = path.join(cwd, f);
        break;
    }
}

console.log(`Generating key for: ${targetDir}`);
const tree = getStructure(targetDir);
fs.writeFileSync('full_structure.txt', tree);
console.log('Tree written to full_structure.txt');
