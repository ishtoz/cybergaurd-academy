# Map Visualization & Examples Guide

This guide provides visual representations and practical examples for working with the CyberGuard Academy first map.

## Map Dimensions Visualization

### Physical Layout
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                    First Map                        │
│                  (50 × 40 tiles)                    │
│              (800 × 640 pixels)                     │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘

Width:  50 tiles × 16 pixels = 800 pixels
Height: 40 tiles × 16 pixels = 640 pixels
```

### Tile Coordinate System
```
(0,0)                           (49,0)
  ┌───┬───┬───┐       ┌───┬───┬───┐
  │ 1 │ 2 │ 3 │ ....  │...│..  │224│
  ├───┼───┼───┤       ├───┼───┼───┤
  │225│226│227│ ....  │...│..  │448│
  ├───┼───┼───┤       ├───┼───┼───┤
  │ · │ · │ · │       │ · │ · │ · │
  └───┴───┴───┘       └───┴───┴───┘
                            ↓
(0,39)                  (49,39)
```

### Pixel Coordinates
```
X: 0 ─────────── 800 pixels
   ├─ 50 tiles ─┤
   
Y: 0 pixels
   ├ 40 tiles
   │
   640 pixels
```

## Tileset Visual Reference

### Tileset Arrangement (48×48 example for Modern_Office_MV_1)

```
Column:  0    1    2    3   ...  47
        ┌────┬────┬────┬────┐
Row 0   │    │    │    │    │... │
        ├────┼────┼────┼────┤
Row 1   │    │    │    │    │... │
        ├────┼────┼────┼────┤
Row 2   │    │    │    │    │... │
        ├────┼────┼────┼────┤
 ...    │    │    │    │    │... │
        ├────┼────┼────┼────┤
Row 47  │    │    │    │    │... │
        └────┴────┴────┴────┘

Total: 48 rows × 48 columns = 2304 tiles
File Size: 768 × 768 pixels
```

### GID to Tileset Index Calculation

```
For Tileset "Modern_Office_MV_1" with firstgid=225:

Tile at column=5, row=10:

  Local Tile Index = row × columns + column
                   = 10 × 48 + 5
                   = 485

  Global ID (GID) = firstgid + local_index
                  = 225 + 485
                  = 710

  To recover:
  - Local Index = GID - firstgid = 710 - 225 = 485
  - Row = 485 ÷ 48 = 10
  - Col = 485 mod 48 = 5
```

## Layer Stacking Visualization

### Visual Depth Order (Bottom to Top)

```
┌────────────────────────────────────┐
│ 0: Bottom floor objects (depth=5)  │ ← Drawn last (on top)
├────────────────────────────────────┤
│ 1: Bottom floor paintings (d=6)    │
├────────────────────────────────────┤
│ 2: Top of map main chairs (d=5)    │
├────────────────────────────────────┤
│ 3: Top of map objects (d=5)        │
├────────────────────────────────────┤
│ 4: Top floor wall objects (d=5)    │
├────────────────────────────────────┤
│ 5: Table dividers (d=4)            │
├────────────────────────────────────┤
│ 6: Top of map background (d=3)     │
├────────────────────────────────────┤
│ 7: Walls (d=1)                     │
├────────────────────────────────────┤
│ 8: Floor base (d=0)                │
├────────────────────────────────────┤
│ 9: Collision layer (hidden)        │
└────────────────────────────────────┘
     ↑ Drawn first (below)
```

## Collision System Visualization

### Collision Grid Example
```
Collision layer data (0 = no collision, X = collision):

    0   1   2   3   4   5   6   7   8   9
  ╔═══╦═══╦═══╦═══╦═══╦═══╦═══╦═══╦═══╦═══╗
0 ║ X ║ X ║ X ║ X ║ X ║ X ║ X ║ X ║ X ║ X ║ ← Wall
  ╠═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╣
1 ║ X ║   ║   ║   ║ X ║   ║   ║   ║   ║ X ║
  ╠═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╣
2 ║ X ║   ║ T ║ T ║ X ║ T ║ T ║   ║   ║ X ║ ← T = Table
  ╠═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╣
3 ║ X ║   ║ T ║ T ║ X ║ T ║ T ║   ║ P ║ X ║ ← P = Player
  ╠═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╣
4 ║ X ║   ║   ║   ║ X ║   ║   ║   ║   ║ X ║
  ╚═══╩═══╩═══╩═══╩═══╩═══╩═══╩═══╩═══╩═══╝

Collision percentage: ~30% of map area
```

## World Coordinate Conversion Examples

### Tile to World Coordinates
```
Map Configuration:
  - Tile size: 16×16 pixels
  - Map dimensions: 50×40 tiles

Example 1:
  Tile position: (10, 5)
  World X = 10 × 16 = 160 px
  World Y = 5 × 16 = 80 px
  → World: (160, 80)

Example 2:
  Tile position: (25, 20)
  World X = 25 × 16 = 400 px
  World Y = 20 × 16 = 320 px
  → World: (400, 320)

Example 3 (Center of map):
  Tile position: (25, 20)
  World: (400, 320)
```

### World to Tile Coordinates
```
World position: (256, 128)
  Tile X = floor(256 / 16) = floor(16) = 16
  Tile Y = floor(128 / 16) = floor(8) = 8
  → Tile position: (16, 8)

World position: (799, 639) [bottom-right corner]
  Tile X = floor(799 / 16) = floor(49.9375) = 49
  Tile Y = floor(639 / 16) = floor(39.9375) = 39
  → Tile position: (49, 39) [last tile]
```

## Layer Data Array Examples

### Understanding the Data Array

```javascript
// Layer has 50 tiles wide, 40 tiles tall = 2000 tiles total
const layer = {
  "name": "Bottom of map floor",
  "width": 50,
  "height": 40,
  "data": [
    0,    0,    0,    ..., 0,       // Row 0 (Y=0): Tiles 0-49
    0,    1337, 1337, ..., 0,       // Row 1 (Y=1): Tiles 50-99
    0,    1337, 1337, ..., 0,       // Row 2 (Y=2): Tiles 100-149
    ...
    2400, 2400, 2400, ..., 0,       // Row 39 (Y=39): Tiles 1950-1999
  ]
};

// Finding tile at position (x=25, y=10):
const x = 25, y = 10;
const index = y * 50 + x = 10 * 50 + 25 = 525;
const tileGID = layer.data[525];
```

### Example Tile Grid (Simplified 5×3)

```
Layer data array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
Width: 5, Height: 3

Visualization:
  ┌───┬───┬───┬───┬───┐
  │ 1 │ 2 │ 3 │ 4 │ 5 │  ← Indices 0-4 (Row Y=0)
  ├───┼───┼───┼───┼───┤
  │ 6 │ 7 │ 8 │ 9 │10 │  ← Indices 5-9 (Row Y=1)
  ├───┼───┼───┼───┼───┤
  │11 │12 │13 │14 │15 │  ← Indices 10-14 (Row Y=2)
  └───┴───┴───┴───┴───┘
  ↑
  Index = Y × Width + X
  Example: Position (2, 1) → Index = 1 × 5 + 2 = 7
```

## Practical Workflow Examples

### Example 1: Load and Create Map

```javascript
// Step 1: Preload
this.load.tilemapTiledJSON('first_map', '/assets/maps/first_map.json');
this.load.image('tileset1', '/assets/tilesets/Modern_Office_MV_1_TILESETS_B-C-D-E.png');
this.load.image('tileset2', '/assets/tilesets/Modern_Office_MV_2_TILESETS_B-C-D-E.png');
// ... load all 6 tilesets

// Step 2: Create
const map = this.make.tilemap({ key: 'first_map' });

// Step 3: Add tilesets (in order)
const ts = [];
ts[0] = map.addTilesetImage('Room_Builder_Office_16x16', 'Room_Builder_Office_16x16');
ts[1] = map.addTilesetImage('Modern_Office_MV_1_TILESETS_B-C-D-E', 'Modern_Office_MV_1_TILESETS_B-C-D-E');
// ... add all 6

// Step 4: Create layers
map.createLayer('Bottom of map floor', ts, 0, 0);
map.createLayer('Top of map walls', ts, 0, 0);
map.createLayer('Top of map main chairs', ts, 0, 0);
```

### Example 2: Setup Collisions

```javascript
const collisionLayer = map.createLayer('collisions', ts, 0, 0);

// Enable collisions on all non-zero tiles
collisionLayer.setCollisionBetween(1, 100000);

// Hide the collision layer for release (show for debugging)
collisionLayer.setVisible(false);

// Create collision with player
this.physics.add.collider(player, collisionLayer);
```

### Example 3: Get Tile Information

```javascript
// Get tile at world position
const worldX = 256;
const worldY = 128;
const tile = layer.getTileAtWorldXY(worldX, worldY);

if (tile) {
  console.log(`Tile GID: ${tile.index}`);
  console.log(`Tile coords: (${tile.x}, ${tile.y})`);
  console.log(`World coords: (${tile.pixelX}, ${tile.pixelY})`);
  
  // Decode which tileset this tile is from
  const tilesetIndex = Math.floor((tile.index - 1) / 225); // Simplified
  console.log(`From tileset: ${tilesetIndex}`);
}
```

### Example 4: Place Object at Tile

```javascript
// Want to spawn NPC at tile (10, 15)
const tileX = 10;
const tileY = 15;

// Convert to world coordinates
const worldX = map.tileToWorldX(tileX);  // 160
const worldY = map.tileToWorldY(tileY);  // 240

// Create sprite at that location
const npc = this.physics.add.sprite(worldX, worldY, 'npc_sprite');
```

### Example 5: Modify Tiles Programmatically

```javascript
// Fill a 5×5 area with tiles from Modern_Office_MV_1
const tileGID = 500; // From Modern_Office_MV_1 (range 225-2528)
map.fill(tileGID, 10, 10, 5, 5, 'Bottom of map floor');

// Draw a horizontal line
for (let x = 0; x < 20; x++) {
  map.putTileAt(tileGID, x, 5, true, 'Bottom of map floor');
}
```

## Performance Metrics

### Load Time
```
Map JSON parsing: 5-10ms
Tileset loading: 20-50ms per tileset (network + decode)
Layer creation: 10-20ms per layer
Total init time: ~200-300ms (typical modern hardware)
```

### Memory Usage
```
Map data: ~2000 numbers per layer × 17 layers = 34,000 values
Tileset cache: 6 images × (768×768 = 588KB) = 3.5MB
Total memory: ~5-10MB depending on browser caching
```

### Rendering Performance
```
Tiles per frame: 2000 (all tiles, off-screen culled by Phaser)
FPS impact: Minimal (60 FPS typical)
GPU memory: ~5MB for textures
```

## Debugging Visualizations

### Debug Mode - Show Collision Tiles
```javascript
const graphics = this.add.graphics();
collisionLayer.renderDebug(graphics, {
  tileColor: new Phaser.Display.Color(0, 0, 255, 100),     // Blue
  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),  // Orange
  faceColor: new Phaser.Display.Color(40, 39, 37, 255)     // Dark gray
});

// Output:
// Blue tiles = non-colliding
// Orange tiles = colliding
// Shows collision geometry visually
```

### Debug Mode - Show Layer Boundaries
```javascript
// Draw rectangle around map
const graphics = this.add.graphics();
graphics.lineStyle(2, 0xff0000);
graphics.strokeRect(0, 0, map.widthInPixels, map.heightInPixels);

// Draw grid
graphics.lineStyle(1, 0x00ff00, 0.3);
for (let x = 0; x <= map.width; x++) {
  graphics.lineBetween(x * 16, 0, x * 16, map.heightInPixels);
}
for (let y = 0; y <= map.height; y++) {
  graphics.lineBetween(0, y * 16, map.widthInPixels, y * 16);
}
```

## Common Pitfalls

### Pitfall 1: Wrong Coordinate System
```javascript
// WRONG - Forgetting pixel vs tile coordinates
player.setPosition(5, 5);  // Too close to origin!

// CORRECT - Convert tiles to world pixels
const tileX = 5, tileY = 5;
const worldX = tileX * 16;  // 80
const worldY = tileY * 16;  // 80
player.setPosition(worldX, worldY);
```

### Pitfall 2: Missing Tilesets
```javascript
// WRONG - Forget to load one tileset
this.load.image('tileset1', ...);
this.load.image('tileset2', ...);
// ... missing tileset 3, 4, 5, 6

// CORRECT - Load ALL tilesets
const tilesets = ['Room_Builder_Office_16x16', 'Modern_Office_MV_1_TILESETS_B-C-D-E', ...];
tilesets.forEach(name => this.load.image(name, `/assets/tilesets/${name}.png`));
```

### Pitfall 3: Not Enabling Collision
```javascript
// WRONG - Create collision layer but forget to enable
const collisionLayer = map.createLayer('collisions', ts);
// ... player walks through walls

// CORRECT - Enable collision detection
collisionLayer.setCollisionBetween(1, 100000);
this.physics.add.collider(player, collisionLayer);
```

## Optimization Tips

1. **Culling**: Only render visible layers during gameplay
2. **Caching**: Pre-load tilesets at startup
3. **Chunks**: Load larger maps in chunks (advanced)
4. **LOD**: Reduce collision density in non-critical areas
5. **WebGL**: Ensure WebGL is enabled for rendering optimization

---

For more information, see:
- `MAP_STRUCTURE_GUIDE.md` - Complete structure reference
- `QUICK_REFERENCE_MAPS.md` - Quick lookup tables
- `FIRST_MAP_JSON_STRUCTURE.md` - JSON format details
