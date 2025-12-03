# CyberGuard Academy Map Structure Guide

## Overview

This guide explains the structure and format of maps in the CyberGuard Academy game, specifically focusing on the `first_map` which is the main office environment.

## Map File Formats

### Current Setup
- **Location**: `/client/public/assets/maps/`
- **Formats**:
  - `first_map.json` - Phaser 3 compatible JSON format (used in game)
  - `second_room.json` - Another map in JSON format

### Editor Format
- **Editor**: Tiled Map Editor
- **Location**: `/client/game/assets/maps/`
- **Format**: `.tmx` (Tiled XML) and `.js` (JavaScript exports)

## First Map Specifications

### Dimensions
```
Width: 50 tiles
Height: 40 tiles
Tile Size: 16x16 pixels
Total Pixels: 800x640 pixels
```

### Tilesets (6 Total)

The map uses multiple tilesets for different visual elements:

#### 1. Room_Builder_Office_16x16
- **firstgid**: 1
- **Tiles**: 224 (16 columns)
- **Image Size**: 256x224 pixels
- **Purpose**: Basic office room building blocks
- **Path**: `/assets/tilesets/Room_Builder_Office_16x16.png`

#### 2. Modern_Office_MV_1_TILESETS_B-C-D-E
- **firstgid**: 225
- **Tiles**: 2304 (48 columns)
- **Image Size**: 768x768 pixels
- **Purpose**: Modern office furniture and decorations (set 1)
- **Path**: `/assets/tilesets/Modern_Office_MV_1_TILESETS_B-C-D-E.png`

#### 3. Modern_Office_MV_2_TILESETS_B-C-D-E
- **firstgid**: 2529
- **Tiles**: 2304 (48 columns)
- **Image Size**: 768x768 pixels
- **Purpose**: Modern office furniture and decorations (set 2)
- **Path**: `/assets/tilesets/Modern_Office_MV_2_TILESETS_B-C-D-E.png`

#### 4. Modern_Office_MV_3_TILESETS_B-C-D-E
- **firstgid**: 4833
- **Tiles**: 2304 (48 columns)
- **Image Size**: 768x768 pixels
- **Purpose**: Modern office furniture and decorations (set 3)
- **Path**: `/assets/tilesets/Modern_Office_MV_3_TILESETS_B-C-D-E.png`

#### 5. Modern_Office_MV_Floors_TILESET_A2
- **firstgid**: 7137
- **Tiles**: 1728 (48 columns)
- **Image Size**: 768x576 pixels
- **Purpose**: Floor textures and patterns
- **Path**: `/assets/tilesets/Modern_Office_MV_Floors_TILESET_A2.png`

#### 6. Modern_Office_MV_Walls_TILESET_A4
- **firstgid**: 8865
- **Tiles**: 2160 (48 columns)
- **Image Size**: 768x720 pixels
- **Purpose**: Wall textures and patterns
- **Path**: `/assets/tilesets/Modern_Office_MV_Walls_TILESET_A4.png`

## Map Layers (17 Total)

The map contains multiple layers organized by visual depth and function:

### Layer Organization

| Layer ID | Name | Purpose | Depth | Type |
|----------|------|---------|-------|------|
| 1 | Exterior most wall | Boundary walls | 1 | Tile Layer |
| 2 | White layer / barrier walls | Interior walls | 1 | Tile Layer |
| 3 | Bottom of map floor | Floor base | 0 | Tile Layer |
| 4 | Top half of map floor | Floor upper section | 0 | Tile Layer |
| 5 | collisions | Collision geometry (hidden) | - | Tile Layer |
| 6 | Bottom of map walls | Lower wall elements | 1 | Tile Layer |
| 7 | Top of map walls | Upper wall elements | 1 | Tile Layer |
| 8 | Top of map background chairs | Background seating | 3 | Tile Layer |
| 9 | Top of map table divider 1 | Table dividers | 4 | Tile Layer |
| 10 | Top of map table divider 2 | Table dividers | 4 | Tile Layer |
| 11 | Top of map objects on background tables | Background table objects | 5 | Tile Layer |
| 12 | Top floor wall / background objects | Wall-mounted items | 5 | Tile Layer |
| 13 | Top of map table dividers | Divider elements | 4 | Tile Layer |
| 14 | Top of map objects on main tables | Main table objects | 5 | Tile Layer |
| 15 | Top of map main chairs | Main seating | 5 | Tile Layer |
| 16 | Bottom floor paintings | Wall paintings | 6 | Tile Layer |
| 17 | Bottom floor objects | Floor objects | 5 | Tile Layer |

### Layer Details

#### Collision Layer
- **Name**: `collisions`
- **Visible**: No (usually hidden for debugging)
- **Purpose**: Physics collision boundaries for the player
- **Collision Rules**: All non-zero tiles have collision enabled

#### Visual Layers
- **Depth Ordering**: Layers are rendered in order, with depth values determining overlap behavior
- **Opacity**: Most layers at 100% opacity, adjustable for fade effects
- **Visibility**: All layers start visible but can be toggled

## Tile Global IDs (GIDs) - Reference

When working with raw tile data, tiles are referenced by Global IDs that encode:
1. **Which tileset** they belong to (determined by comparing against firstgid values)
2. **Which tile within that tileset** (local ID = gid - firstgid)
3. **Flip flags** (encoded in high bits for horizontal/vertical flipping)

### GID Calculation Example
```
If a tile has GID = 1337:
- GID 1 - 224: Tileset 1 (Room_Builder)
- GID 225 - 2528: Tileset 2 (Modern_Office_MV_1)
- GID 2529 - 4832: Tileset 3 (Modern_Office_MV_2)
- GID 4833 - 7136: Tileset 4 (Modern_Office_MV_3)
- GID 7137 - 8864: Tileset 5 (Floors)
- GID 8865+: Tileset 6 (Walls)

1337 falls in range 1337 >= 1337 and < 2529
So it's from Tileset 1 (Modern_Office_MV_1)
Local ID = 1337 - 225 = 1112
```

## Map File Structure (JSON)

### Root Properties
```json
{
  "width": 50,
  "height": 40,
  "tilewidth": 16,
  "tileheight": 16,
  "orientation": "orthogonal",
  "renderorder": "right-down",
  "version": "1.10",
  "tilesets": [...],
  "layers": [...]
}
```

### Tileset Definition
```json
{
  "columns": 48,
  "firstgid": 225,
  "image": "../../maps/.../Modern_Office_MV_1_TILESETS_B-C-D-E.png",
  "imageheight": 768,
  "imagewidth": 768,
  "margin": 0,
  "name": "Modern_Office_MV_1_TILESETS_B-C-D-E",
  "spacing": 0,
  "tilecount": 2304,
  "tileheight": 16,
  "tilewidth": 16
}
```

### Tile Layer Definition
```json
{
  "data": [0, 0, 0, ..., 1234, 5678, ...],  // Array of GIDs (2000 tiles for 50x40 map)
  "height": 40,
  "id": 3,
  "name": "Bottom of map floor",
  "opacity": 1,
  "type": "tilelayer",
  "visible": true,
  "width": 50,
  "x": 0,
  "y": 0
}
```

## Using Maps in Phaser 3

### Loading a Map
```javascript
// In preload()
this.load.tilemapTiledJSON('map', '/assets/maps/first_map.json');

// Load all tilesets
const tilesets = [
  'Modern_Office_MV_1_TILESETS_B-C-D-E',
  'Modern_Office_MV_2_TILESETS_B-C-D-E',
  'Modern_Office_MV_3_TILESETS_B-C-D-E',
  'Modern_Office_MV_Floors_TILESET_A2',
  'Modern_Office_MV_Walls_TILESET_A4',
  'Room_Builder_Office_16x16'
];
tilesets.forEach(name => this.load.image(name, `/assets/tilesets/${name}.png`));
```

### Creating the Tilemap
```javascript
// In create()
const map = this.make.tilemap({ key: 'map' });

// Add all tilesets
const ts1 = map.addTilesetImage('Modern_Office_MV_1_TILESETS_B-C-D-E', 'Modern_Office_MV_1_TILESETS_B-C-D-E');
const ts2 = map.addTilesetImage('Modern_Office_MV_2_TILESETS_B-C-D-E', 'Modern_Office_MV_2_TILESETS_B-C-D-E');
// ... add remaining tilesets

// Create visible layers
const groundLayer = map.createLayer('Bottom of map floor', [ts1, ts2, ts3, ts4, ts5, ts6]);
const wallLayer = map.createLayer('Bottom of map walls', [ts1, ts2, ts3, ts4, ts5, ts6]);
// ... create other layers
```

### Setting Up Collisions
```javascript
// Create collision layer
const collisionsLayer = map.createLayer('collisions', [ts1, ts2, ts3, ts4, ts5, ts6]);
collisionsLayer.setVisible(false); // Usually hidden

// Enable collision on all non-zero tiles
collisionsLayer.setCollisionBetween(1, 100000);

// Add collision with player
this.physics.add.collider(player, collisionsLayer);
```

## Editing Maps

### With Tiled Editor
1. Open `/client/game/assets/maps/first_map.tmx` in Tiled Editor
2. The TMX file references all tilesets
3. Edit layers, tiles, and objects
4. Export as JSON to `/client/game/assets/maps/first_map.json`
5. Copy to `/client/public/assets/maps/` for web serving

### Creating a New Map
1. Use the existing tileset files from `/client/game/assets/maps/`
2. Create new layers for different visual depths
3. Add a collision layer with collision geometry
4. Add object groups for game elements (NPCs, items)
5. Export as JSON format

## Performance Notes

- **Map Size**: 50x40 = 2000 tiles per layer
- **Layer Count**: 17 layers = 34,000 tile operations
- **Tileset Count**: 6 tilesets = good balance between coverage and file size
- **Collision Density**: Approximately 30% of map has collision geometry

## Common Tasks

### Find a Specific Tile
```javascript
// Get tile at world position
const tile = layer.getTileAtWorldXY(worldX, worldY);
console.log(`Tile GID: ${tile.index}`);
console.log(`Tile location: ${tile.x}, ${tile.y}`);
```

### Replace Tiles in a Region
```javascript
// Fill region with specific tile GID
map.fill(500, 10, 10, 20, 20, 'Bottom of map floor');
```

### Get All Collision Tiles
```javascript
const collisionTiles = collisionsLayer.getCollisionTiles();
console.log(`Total collision tiles: ${collisionTiles.length}`);
```

### Spawn NPC at Tile
```javascript
// Convert tile coordinates to world coordinates
const tileX = 25, tileY = 20;
const worldX = map.tileToWorldX(tileX);
const worldY = map.tileToWorldY(tileY);
createNPC(worldX, worldY);
```

## Troubleshooting

### Tiles Not Displaying
- **Check**: Are all tilesets loaded before creating layers?
- **Check**: Are tileset names spelled correctly (case-sensitive)?
- **Check**: Do asset paths point to correct image files?

### Collision Not Working
- **Check**: Is collisions layer visible? (It should be hidden normally)
- **Check**: Are collision tiles properly set with `setCollisionBetween()`?
- **Check**: Is player physics body overlapping the collision layer?

### Performance Issues
- **Optimize**: Reduce number of active layers rendered
- **Optimize**: Use layer culling for off-screen areas
- **Optimize**: Reduce collision geometry density where not needed

## File Locations

```
/client/
├── game/
│   └── assets/
│       └── maps/
│           ├── first_map.tmx (source)
│           ├── first_map.js (JavaScript export)
│           ├── second_map.tmx
│           └── second_map.js
└── public/
    └── assets/
        ├── maps/
        │   ├── first_map.json (used in game)
        │   ├── office_map.json
        │   └── second_room.json
        └── tilesets/
            ├── Modern_Office_MV_1_TILESETS_B-C-D-E.png
            ├── Modern_Office_MV_2_TILESETS_B-C-D-E.png
            ├── Modern_Office_MV_3_TILESETS_B-C-D-E.png
            ├── Modern_Office_MV_Floors_TILESET_A2.png
            ├── Modern_Office_MV_Walls_TILESET_A4.png
            └── Room_Builder_Office_16x16.png
```

## References

- [Tiled Map Editor](https://www.mapeditor.org/)
- [Phaser 3 Tilemap API](https://newdocs.phaser.io/docs/3.60.0/Phaser.Tilemaps.Tilemap)
- [Tilemap Converter Utility](/client/src/utils/tilemapConverter.js)

## Related Code

- **Scene**: `/client/src/scenes/MainScene.js`
- **Utilities**: `/client/src/utils/tilemapConverter.js`
- **Game Canvas**: `/client/src/components/GameCanvas.js`
