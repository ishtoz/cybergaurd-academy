# CyberGuard Academy Map System - Complete Documentation Index

Welcome to the comprehensive documentation for the CyberGuard Academy map system! This index helps you find the right resource for your needs.

## 📚 Documentation Files

### For Quick Lookups
- **[QUICK_REFERENCE_MAPS.md](./QUICK_REFERENCE_MAPS.md)** ⭐ START HERE
  - One-page cheat sheet
  - Quick tables and snippets
  - Common tasks
  - GID ranges
  - Best for: Developers who need quick answers

### For Understanding Structure
- **[MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md)** 🗺️ COMPREHENSIVE GUIDE
  - Complete map specifications
  - Layer organization (17 layers)
  - Tileset details (6 tilesets)
  - Coordinate systems
  - Editing instructions
  - Best for: Learning how maps work, editing in Tiled

### For JSON Format Details
- **[FIRST_MAP_JSON_STRUCTURE.md](./FIRST_MAP_JSON_STRUCTURE.md)** 📋 TECHNICAL REFERENCE
  - JSON file structure
  - Property documentation
  - Array format explanation
  - GID calculations
  - Validation checklist
  - Best for: Understanding file format, debugging issues

### For Examples & Visualization
- **[MAP_VISUALIZATION_EXAMPLES.md](./MAP_VISUALIZATION_EXAMPLES.md)** 🎨 EXAMPLES & DIAGRAMS
  - Visual diagrams
  - Code examples
  - Workflow demonstrations
  - Performance metrics
  - Debugging techniques
  - Common pitfalls
  - Best for: Learning by example, troubleshooting

### For Code Implementation
- **[/client/src/utils/tilemapConverter.js](./client/src/utils/tilemapConverter.js)** 💻 UTILITY MODULE
  - `convertTiledMapToPhaser()` - Convert Tiled maps to Phaser format
  - `parseTileGid()` - Decode tile GID with flip flags
  - `convertImagePath()` - Normalize asset paths
  - Comprehensive JSDoc comments
  - Best for: Using the utility in code

## 🎯 Quick Navigation by Task

### "I want to..."

#### ...load and display the map in Phaser
1. Read: [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md) - Section "Using Maps in Phaser 3"
2. Reference: [QUICK_REFERENCE_MAPS.md](./QUICK_REFERENCE_MAPS.md) - "Quick Code Snippets"
3. Code: See MainScene.js preload() and create()

#### ...understand the map file format
1. Start: [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md) - Overview
2. Details: [FIRST_MAP_JSON_STRUCTURE.md](./FIRST_MAP_JSON_STRUCTURE.md) - Complete structure
3. Reference: [QUICK_REFERENCE_MAPS.md](./QUICK_REFERENCE_MAPS.md) - Reference tables

#### ...debug a map issue
1. Check: [MAP_VISUALIZATION_EXAMPLES.md](./MAP_VISUALIZATION_EXAMPLES.md) - "Debugging Visualizations"
2. Troubleshoot: [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md) - "Troubleshooting" section
3. Validate: [FIRST_MAP_JSON_STRUCTURE.md](./FIRST_MAP_JSON_STRUCTURE.md) - "Validation Checklist"

#### ...edit the map in Tiled Editor
1. Read: [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md) - "Editing Maps" section
2. Reference: File locations in "Editing Maps" section
3. Process: Export as JSON and copy to public/assets/

#### ...understand tile GIDs and coordinates
1. Learn: [FIRST_MAP_JSON_STRUCTURE.md](./FIRST_MAP_JSON_STRUCTURE.md) - "Tile GID Reference"
2. Practice: [MAP_VISUALIZATION_EXAMPLES.md](./MAP_VISUALIZATION_EXAMPLES.md) - "World Coordinate Conversion Examples"
3. Implement: Use `parseTileGid()` from tilemapConverter.js

#### ...spawn objects on the map
1. Learn: [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md) - "Common Tasks"
2. Code: [MAP_VISUALIZATION_EXAMPLES.md](./MAP_VISUALIZATION_EXAMPLES.md) - "Example 4"
3. Reference: World coordinate conversion sections

#### ...set up collision detection
1. Guide: [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md) - "Setting Up Collisions"
2. Code: [QUICK_REFERENCE_MAPS.md](./QUICK_REFERENCE_MAPS.md) - "Create Collision"
3. Debug: [MAP_VISUALIZATION_EXAMPLES.md](./MAP_VISUALIZATION_EXAMPLES.md) - "Debug Mode"

#### ...optimize map performance
1. Tips: [MAP_VISUALIZATION_EXAMPLES.md](./MAP_VISUALIZATION_EXAMPLES.md) - "Optimization Tips"
2. Metrics: "Performance Metrics" section in same file
3. Troubleshoot: [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md) - "Performance Notes"

## 📊 Map Specifications at a Glance

```
Map Name:              First Map (first_map.json)
Dimensions:            50 × 40 tiles
Tile Size:             16 × 16 pixels
Total Pixels:          800 × 640 pixels
Total Tiles per Layer: 2,000
Number of Layers:      17
Number of Tilesets:    6

Tilesets:
  1. Room_Builder_Office_16x16          (FirstGID: 1,    224 tiles)
  2. Modern_Office_MV_1_TILESETS        (FirstGID: 225,  2304 tiles)
  3. Modern_Office_MV_2_TILESETS        (FirstGID: 2529, 2304 tiles)
  4. Modern_Office_MV_3_TILESETS        (FirstGID: 4833, 2304 tiles)
  5. Modern_Office_MV_Floors_TILESET    (FirstGID: 7137, 1728 tiles)
  6. Modern_Office_MV_Walls_TILESET     (FirstGID: 8865, 2160 tiles)

Coordinates:
  0,0 = Top-left
  49,39 = Bottom-right
  
File Locations:
  Source (Tiled):  /client/game/assets/maps/first_map.tmx
  Web (Phaser):    /client/public/assets/maps/first_map.json
```

## 🗂️ File Structure

```
cybergaurd-academy/
├── MAP_STRUCTURE_GUIDE.md              (Complete reference)
├── QUICK_REFERENCE_MAPS.md             (Quick lookup)
├── FIRST_MAP_JSON_STRUCTURE.md         (JSON format)
├── MAP_VISUALIZATION_EXAMPLES.md       (Diagrams & examples)
├── client/
│   ├── game/assets/maps/
│   │   ├── first_map.tmx              (Tiled source)
│   │   ├── first_map.js               (JS export)
│   │   └── ...
│   ├── public/assets/
│   │   ├── maps/
│   │   │   ├── first_map.json         (Game uses this)
│   │   │   └── ...
│   │   └── tilesets/
│   │       ├── Modern_Office_MV_1_TILESETS_B-C-D-E.png
│   │       └── ... (6 total)
│   └── src/
│       ├── scenes/MainScene.js        (Uses maps)
│       ├── utils/tilemapConverter.js  (Utility module)
│       └── ...
```

## 🔧 Developer Workflow

### Typical Development Cycle

1. **Design** - Sketch map layout
   - Reference: MAP_STRUCTURE_GUIDE.md "Editing Maps" section

2. **Create** - Edit in Tiled Editor
   - Load: `/client/game/assets/maps/first_map.tmx`
   - Modify layers, tiles, objects
   - Reference: MAP_STRUCTURE_GUIDE.md

3. **Export** - Export as JSON
   - Export to: `/client/game/assets/maps/first_map.json`
   - Copy to: `/client/public/assets/maps/first_map.json`

4. **Load** - Load in Phaser scene
   - Reference: QUICK_REFERENCE_MAPS.md "Quick Code Snippets"

5. **Debug** - Test and fix issues
   - Reference: MAP_VISUALIZATION_EXAMPLES.md "Debugging Visualizations"

6. **Optimize** - Performance tuning
   - Reference: MAP_VISUALIZATION_EXAMPLES.md "Optimization Tips"

## 💡 Key Concepts

### Global Tile IDs (GIDs)
- Each tile in the map is referenced by a Global ID
- GID encodes: which tileset + position in tileset + flip flags
- Ranges by tileset: See QUICK_REFERENCE_MAPS.md "GID Ranges"
- Decode with: `parseTileGid()` from tilemapConverter.js

### Coordinate Systems
- **Tile coordinates**: Grid position (0-49 X, 0-39 Y)
- **World coordinates**: Pixels in game world (0-800 X, 0-640 Y)
- **Array index**: `index = y * width + x`
- Conversion: `tile_to_world = tile * 16`, `world_to_tile = floor(world / 16)`
- Examples: See MAP_VISUALIZATION_EXAMPLES.md "Coordinate Conversion"

### Layers
- 17 total layers in first map
- Rendering depth determined by layer order and depth property
- Collision layer is separate (usually hidden)
- Each layer has 2000 tile entries (50×40)

### Tilesets
- 6 tilesets provide the visual elements
- Each tileset is one PNG image
- Tilesets are arranged in grids (different dimensions)
- FirstGID determines where a tileset's tiles start in GID numbering

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Tiles not visible | Tileset not loaded | Load all 6 tilesets in preload() |
| Collision not working | Layer not configured | Call `setCollisionBetween()` |
| Wrong tiles rendering | Incorrect layer selected | Verify layer name (case-sensitive) |
| Asset 404 errors | Wrong path | Check asset path in tileset definitions |
| Map won't load | Invalid JSON | Validate JSON and GID ranges |
| Performance lag | Too many updates | Reduce layer visibility or cull off-screen |

See MAP_STRUCTURE_GUIDE.md "Troubleshooting" for detailed solutions.

## 📖 Reading Order by Role

### For Game Designers
1. MAP_STRUCTURE_GUIDE.md - Understand map layout
2. MAP_VISUALIZATION_EXAMPLES.md - See visual examples
3. Open Tiled Editor and create/modify maps

### For Frontend Developers
1. QUICK_REFERENCE_MAPS.md - Get quick code examples
2. client/src/utils/tilemapConverter.js - Understand utility functions
3. client/src/scenes/MainScene.js - See implementation
4. MAP_STRUCTURE_GUIDE.md - Reference as needed

### For Game Programmers
1. FIRST_MAP_JSON_STRUCTURE.md - Understand data format
2. client/src/utils/tilemapConverter.js - Learn conversion logic
3. MAP_VISUALIZATION_EXAMPLES.md - Coordinate conversions
4. Implement game logic with map data

### For System Architects
1. MAP_STRUCTURE_GUIDE.md - Overview and design
2. FIRST_MAP_JSON_STRUCTURE.md - Data model
3. MAP_VISUALIZATION_EXAMPLES.md - Performance considerations
4. Plan map system extensions

## 🔗 Related Files

### Map Files
- **Source**: `/client/game/assets/maps/first_map.tmx`
- **Export**: `/client/game/assets/maps/first_map.js`
- **Game Asset**: `/client/public/assets/maps/first_map.json`

### Tileset Images
- Located in: `/client/public/assets/tilesets/`
- 6 PNG files, ~500KB each
- Referenced in first_map.json tilesets array

### Code Integration
- **Scene**: `/client/src/scenes/MainScene.js`
- **Utility**: `/client/src/utils/tilemapConverter.js`
- **Component**: `/client/src/components/GameCanvas.js`

### External Tools
- **Editor**: Tiled Map Editor (download from www.mapeditor.org)
- **Framework**: Phaser 3 (https://phaser.io/)
- **Format**: JSON (Tiled export format)

## 📝 Documentation Quality

- ✅ Complete: All major topics covered
- ✅ Accurate: Matches first_map.json structure exactly
- ✅ Organized: Multiple entry points for different needs
- ✅ Examples: Code samples for common tasks
- ✅ Diagrams: Visual representations of key concepts
- ✅ Tables: Reference data in easy-to-scan format
- ✅ Links: Cross-references between documents

## 🚀 Getting Started

### Fastest Path (5 minutes)
1. Read: [QUICK_REFERENCE_MAPS.md](./QUICK_REFERENCE_MAPS.md)
2. Look at: Code snippets section
3. Start coding: Use examples in MainScene.js as template

### Complete Understanding (30 minutes)
1. Skim: [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md)
2. Reference: [MAP_VISUALIZATION_EXAMPLES.md](./MAP_VISUALIZATION_EXAMPLES.md)
3. Details: [FIRST_MAP_JSON_STRUCTURE.md](./FIRST_MAP_JSON_STRUCTURE.md)
4. Code: Examine tilemapConverter.js functions

### Deep Dive (1+ hours)
1. Read all documentation files in order
2. Study tilemapConverter.js implementation
3. Examine MainScene.js and how it uses maps
4. Open first_map.json and explore structure
5. Experiment with Tiled Editor

## 📞 Questions?

If you have questions about:
- **Map structure**: See [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md)
- **Code usage**: See [QUICK_REFERENCE_MAPS.md](./QUICK_REFERENCE_MAPS.md) or tilemapConverter.js
- **JSON format**: See [FIRST_MAP_JSON_STRUCTURE.md](./FIRST_MAP_JSON_STRUCTURE.md)
- **Debugging**: See [MAP_VISUALIZATION_EXAMPLES.md](./MAP_VISUALIZATION_EXAMPLES.md)
- **Editing**: See [MAP_STRUCTURE_GUIDE.md](./MAP_STRUCTURE_GUIDE.md) "Editing Maps"

---

**Last Updated**: 2024
**Format**: Tiled Editor JSON → Phaser 3
**Status**: Complete and Ready for Development
