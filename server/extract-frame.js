const fs = require('fs');
const path = require('path');

// Using a simple approach with sharp library
const sharp = require('sharp');

async function extractFrame() {
  try {
    const inputPath = 'd:\\projects\\cybergaurd-academy\\client\\public\\assets\\sprites\\adam_hr.png';
    const outputPath = 'd:\\projects\\cybergaurd-academy\\client\\public\\assets\\sprites\\adam_hr_4th_frame.png';
    
    // Get image metadata to find dimensions
    const metadata = await sharp(inputPath).metadata();
    console.log('Image dimensions:', metadata.width, 'x', metadata.height);
    
    // Assuming 4 frames side by side, each frame is width/4
    const frameWidth = metadata.width / 4;
    const frameHeight = metadata.height;
    
    // Extract the 4th frame (index 3, so starts at x = frameWidth * 3)
    const x = frameWidth * 3;
    
    await sharp(inputPath)
      .extract({
        left: Math.round(x),
        top: 0,
        width: Math.round(frameWidth),
        height: frameHeight
      })
      .toFile(outputPath);
    
    console.log('✅ Extracted 4th frame successfully!');
    console.log('Saved to:', outputPath);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

extractFrame();
