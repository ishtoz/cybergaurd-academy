# CyberGuard Academy Maps - Quick Start Guide

## 🎮 30-Second Overview

The CyberGuard Academy game uses Tiled Editor maps converted to JSON for Phaser 3. The **first_map** is a 50×40 tile office environment with 6 tilesets and 17 layers.

## ⚡ Get Started in 3 Steps

### Step 1: Find Your Answer
Use **QUICK_REFERENCE_MAPS.md** for quick lookup or see navigation below.

### Step 2: Look at Examples
See code snippets in **MAP_VISUALIZATION_EXAMPLES.md** or **QUICK_REFERENCE_MAPS.md**.

### Step 3: Reference as Needed
Full details in **MAP_STRUCTURE_GUIDE.md** or technical specs in **FIRST_MAP_JSON_STRUCTURE.md**.

---

## 🎯 Common Questions

### Q: How do I load the map in Phaser?
**A:** See **QUICK_REFERENCE_MAPS.md** → "Quick Code Snippets" → "Load Map in Phaser"

```javascript
// preload()
this.load.tilemapTiledJSON('map', '/assets/maps/first_map.json');
this.load.image('Modern_Office_MV_1_TILESETS_B-C-D-E', '/assets/tilesets/Modern_Office_MV_1_TILESETS_B-C-D-E.png');
// Load all 6 tilesets...

// create()
const map = this.make.tilemap({ key: 'map' });
const ts = [ts1, ts2, ts3, ts4, ts5, ts6]; // all tilesets
map.createLayer('Bottom of map floor', ts, 0, 0);
```

### Q: What are the map dimensions?
**A:** 50 tiles wide × 40 tiles tall = 800 × 640 pixels (with 16×16 tiles)
See **QUICK_REFERENCE_MAPS.md** → "Map Specs at a Glance"

### Q: How do I add collision?
**A:** See **QUICK_REFERENCE_MAPS.md** → "Create Collision"

```javascript
const collisionsLayer = map.createLayer('collisions', ts);
collisionsLayer.setCollisionBetween(1, 100000);
this.physics.add.collider(player, collisionsLayer);
```

### Q: Where are the map files?
**A:** 
- **Game uses**: `/client/public/assets/maps/first_map.json`
- **Tiled Editor**: `/client/game/assets/maps/first_map.tmx`
- **Tilesets**: `/client/public/assets/tilesets/*.png` (6 files)

See **MAP_STRUCTURE_GUIDE.md** → "File Locations"

### Q: How do I edit the map?
**A:** 
1. Open `/client/game/assets/maps/first_map.tmx` in Tiled Editor
2. Make changes
3. Export as JSON
4. Copy to `/client/public/assets/maps/`

See **MAP_STRUCTURE_GUIDE.md** → "Editing Maps"

### Q: What is a GID (Global ID)?
**A:** Each tile is referenced by a number called a GID. It tells Phaser:
- Which tileset the tile comes from
- Which tile within that tileset
- If the tile is flipped

See **QUICK_REFERENCE_MAPS.md** → "GID Ranges by Tileset"

### Q: How do I spawn an NPC on a tile?
**A:** Convert tile coordinates to world pixels and place sprite there.

See **MAP_VISUALIZATION_EXAMPLES.md** → "Example 4: Place Object at Tile"

```javascript
const tileX = 10, tileY = 15;
const worldX = map.tileToWorldX(tileX);  // 160 pixels
const worldY = map.tileToWorldY(tileY);  // 240 pixels
const npc = this.physics.add.sprite(worldX, worldY, 'npc_sprite');
```

### Q: What's the difference between tile coordinates and world coordinates?
**A:**
- **Tile**: Grid position (0-49 X, 0-39 Y)
- **World**: Pixels (0-800 X, 0-640 Y)
- **Conversion**: `world = tile * 16`, `tile = floor(world / 16)`

See **MAP_VISUALIZATION_EXAMPLES.md** → "World Coordinate Conversion Examples"

### Q: How many layers does the map have?
**A:** 17 layers total:
- 1 Collision layer (hidden)
- 16 Visual layers (various depths)

See **QUICK_REFERENCE_MAPS.md** → "Layer Names"

### Q: How many tilesets does the map use?
**A:** 6 tilesets providing office furniture and building elements.

See **QUICK_REFERENCE_MAPS.md** → "Tileset Reference"

### Q: How do I debug collision issues?
**A:** Show the collision layer with debug graphics.

See **MAP_VISUALIZATION_EXAMPLES.md** → "Debugging Visualizations"

```javascript
collisionsLayer.setVisible(true); // Show collision layer
// And use renderDebug() for detailed visualization
```

### Q: What if I get a "Tileset not found" error?
**A:** You forgot to load one of the 6 tilesets in preload().

See **MAP_STRUCTURE_GUIDE.md** → "Troubleshooting"

Tilesets needed (all 6):
1. Room_Builder_Office_16x16
2. Modern_Office_MV_1_TILESETS_B-C-D-E
3. Modern_Office_MV_2_TILESETS_B-C-D-E
4. Modern_Office_MV_3_TILESETS_B-C-D-E
5. Modern_Office_MV_Floors_TILESET_A2
6. Modern_Office_MV_Walls_TILESET_A4

---

## 📚 Documentation Files Quick Links

| Document | Best For | Read Time |
|----------|----------|-----------|
| **QUICK_REFERENCE_MAPS.md** | Quick answers & code snippets | 5 min |
| **MAP_STRUCTURE_GUIDE.md** | Understanding the complete system | 20 min |
| **FIRST_MAP_JSON_STRUCTURE.md** | JSON file format details | 25 min |
| **MAP_VISUALIZATION_EXAMPLES.md** | Diagrams, examples & debugging | 20 min |
| **MAPS_DOCUMENTATION_INDEX.md** | Navigation & task lookup | 10 min |
| **tilemapConverter.js** | Code utility & implementation | variable |

---

## 🚀 Quickest Paths

### Path A: I just want to load the map (5 min)
1. Read: **QUICK_REFERENCE_MAPS.md** → "Load Map in Phaser"
2. Copy code
3. Done!

### Path B: I want to understand maps (20 min)
1. Read: **QUICK_REFERENCE_MAPS.md** → Full file
2. Skim: **MAP_STRUCTURE_GUIDE.md** → First 5 sections
3. Reference: Bookmark for later

### Path C: I need to debug something (15 min)
1. Check: **MAP_STRUCTURE_GUIDE.md** → "Troubleshooting"
2. Follow: Diagnostic steps
3. Reference: **MAP_VISUALIZATION_EXAMPLES.md** → Debug section if needed

### Path D: I want to edit the map (30 min)
1. Read: **MAP_STRUCTURE_GUIDE.md** → "Editing Maps"
2. Follow: Step-by-step workflow
3. Reference: Layer information as needed

---

## 🔧 Essential Reference

### Map Specifications
```
Dimensions:    50 × 40 tiles
Pixel Size:    800 × 640 pixels
Tile Size:     16 × 16 pixels
Layers:        17 total
Tilesets:      6 total
Total Tiles:   2,000 per layer
```

### File Locations
```
Game Map:      /client/public/assets/maps/first_map.json
Tiled Source:  /client/game/assets/maps/first_map.tmx
Tilesets:      /client/public/assets/tilesets/*.png (6 files)
Code:          /client/src/utils/tilemapConverter.js
Scene:         /client/src/scenes/MainScene.js
```

### Tileset GID Ranges
```
1 - 224:       Room_Builder_Office_16x16
225 - 2528:    Modern_Office_MV_1_TILESETS
2529 - 4832:   Modern_Office_MV_2_TILESETS
4833 - 7136:   Modern_Office_MV_3_TILESETS
7137 - 8864:   Modern_Office_MV_Floors
8865+:         Modern_Office_MV_Walls
```

### Coordinate Conversion
```
Tile to World: world = tile × 16
World to Tile: tile = floor(world / 16)
Map Bounds:    Tiles (0,0) to (49,39)
               World (0,0) to (800,640)
```

---

## ✅ Checklist: Getting Started

- [ ] Read QUICK_REFERENCE_MAPS.md
- [ ] Load tilesets in preload()
- [ ] Create tilemap in create()
- [ ] Create visual layers
- [ ] Create collision layer
- [ ] Add collider between player and collision layer
- [ ] Test in game
- [ ] Bookmark documentation for reference

---

## 🐛 Troubleshooting Quick Guide

| Problem | Check | Solution |
|---------|-------|----------|
| Tiles not showing | Are all 6 tilesets loaded? | Load all tilesets in preload() |
| Collision not working | Is collision enabled? | Call setCollisionBetween(1, 100000) |
| Wrong layer visible | Is correct layer name used? | Layer names are case-sensitive |
| Asset 404 error | Are asset paths correct? | Check paths in tileset definitions |
| Map won't load | Is JSON valid? | Validate JSON file syntax |
| Inventory missing | Are all layers created? | Create all needed layers from map |

---

## 💡 Pro Tips

1. **Use MainScene.js as reference** - See real implementation
2. **Save this file** - Bookmark it for quick access
3. **Keep tileset names handy** - All 6 are needed every time
4. **Use tilemapConverter.js** - Don't reinvent the wheel
5. **Check examples first** - MAP_VISUALIZATION_EXAMPLES.md has real code
6. **Map uses orthogonal projection** - Standard square grid (not isometric)
7. **All coordinates are 0-based** - (0,0) is top-left
8. **Collision layer is separate** - Create visual layers separately

---

## 🎓 Next Steps

### To Learn More
→ Read **MAP_STRUCTURE_GUIDE.md**

### To See Examples  
→ Check **MAP_VISUALIZATION_EXAMPLES.md**

### To Get Help
→ Use **MAPS_DOCUMENTATION_INDEX.md** → "Quick Navigation by Task"

### To Code
→ Use `/client/src/scenes/MainScene.js` as reference

### To Edit Maps
→ Follow steps in **MAP_STRUCTURE_GUIDE.md** → "Editing Maps"

---

## 📖 Documentation Overview

```
All documentation files are in the project root:
├── QUICK_REFERENCE_MAPS.md (START HERE for quick lookup)
├── MAP_STRUCTURE_GUIDE.md (Complete reference)
├── FIRST_MAP_JSON_STRUCTURE.md (Technical details)
├── MAP_VISUALIZATION_EXAMPLES.md (Diagrams & code)
├── MAPS_DOCUMENTATION_INDEX.md (Navigation)
├── DOCUMENTATION_COMPLETION_SUMMARY.md (What's included)
└── QUICK_START_GUIDE.md (This file!)

Code implementation: /client/src/utils/tilemapConverter.js
Example usage: /client/src/scenes/MainScene.js
```

---

**Ready to start? Pick a question above or go to QUICK_REFERENCE_MAPS.md!** ✨

---

*For complete navigation and task-based guides, see MAPS_DOCUMENTATION_INDEX.md*
