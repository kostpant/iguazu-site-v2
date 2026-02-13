const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../animationhero');
const OUTPUT_DIR = path.join(__dirname, '../public/sequence');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read all files from source
const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp'))
    .sort(); // Ensure alphabetical order

console.log(`Found ${files.length} images in ${SOURCE_DIR}`);

files.forEach((file, index) => {
    // New name: frame_001.jpg, frame_002.jpg, etc.
    // Note: The user's sequence seems to start at 000, but our component expects 1-based or we adjust component.
    // Let's stick to 1-based for the component logic I wrote (1 to FRAME_COUNT).
    const ext = path.extname(file);
    const newName = `frame_${(index + 1).toString().padStart(3, '0')}${ext}`;

    fs.copyFileSync(path.join(SOURCE_DIR, file), path.join(OUTPUT_DIR, newName));
});

console.log(`Copied and renamed ${files.length} frames to ${OUTPUT_DIR}`);
