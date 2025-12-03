# First Map JSON Structure - Detailed Reference

This document describes the exact structure of the `first_map.json` file used by the CyberGuard Academy game.

## File Format Overview

The `first_map.json` is a valid Tiled Editor JSON export that contains:
- Map metadata (dimensions, tile sizes, orientation)
- Tileset definitions (which image files provide tiles)
- Layer definitions (the visual and collision layers)
- Object groups (for NPCs, items, spawn points)

## Complete Structure

### Root Level Properties

```json
{
  "compressionlevel": -1,
  "height": 40,
  "infinite": false,
  "layers": [...],
  "nextlayerid": 20,
  "nextobjectid": 1,
  "orientation": "orthogonal",
  "renderorder": "right-down",
  "tiledversion": "1.10.1",
  "tileheight": 16,
  "tilewidth": 16,
  "tilesets": [...],
  "type": "map",
  "version": "1.10",
  "width": 50
}
```

#### Root Properties Explained

| Property | Value | Purpose |
|----------|-------|---------|
| `compressionlevel` | -1 | No compression (Tiled default) |
| `height` | 40 | Map height in tiles |
| `width` | 50 | Map width in tiles |
| `tileheight` | 16 | Individual tile height in pixels |
| `tilewidth` | 16 | Individual tile width in pixels |
| `infinite` | false | Map is not infinite (fixed size) |
| `orientation` | "orthogonal" | Square grid (not isometric or hexagonal) |
| `renderorder` | "right-down" | Render left-to-right, top-to-bottom |
| `type` | "map" | This is a tilemap document |
| `tiledversion` | "1.10.1" | Version of Tiled Editor used |
| `version` | "1.10" | Tiled map format version |
| `nextlayerid` | 20 | Next available layer ID (internal counter) |
| `nextobjectid` | 1 | Next available object ID (internal counter) |

## Tilesets Array

Each tileset represents one image file containing multiple tiles.

### Single Tileset Structure

```json
{
  "columns": 48,
  "firstgid": 225,
  "image": "../../maps/Modern_Office_Revamped_v1.2/5_Modern_Office_RPG_MAKER_MV/Modern_Office_MV_1_TILESETS_B-C-D-E.png",
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

#### Tileset Properties Explained

| Property | Type | Purpose |
|----------|------|---------|
| `name` | string | Unique identifier for this tileset (no spaces in Tiled) |
| `firstgid` | number | First Global ID assigned to tiles in this tileset |
| `image` | string | Relative path to the tileset image file |
| `imagewidth` | number | Image width in pixels |
| `imageheight` | number | Image height in pixels |
| `tilewidth` | number | Width of each tile in pixels |
| `tileheight` | number | Height of each tile in pixels |
| `columns` | number | Number of tiles per row in the image |
| `tilecount` | number | Total number of tiles in this tileset |
| `spacing` | number | Pixels between tiles in the image (usually 0) |
| `margin` | number | Pixels of empty space around the image edges (usually 0) |

### Calculating Grid Layout

For a tileset with `columns=48`, `imagewidth=768`, `tilewidth=16`:
- Number of rows = `tilecount / columns` = `2304 / 48` = 48 rows
- Layout: 48 tiles wide × 48 tiles tall = 2304 total tiles

### All 6 Tilesets

```
Name                                  FirstGID  Columns  Rows  Tiles   Size
──────────────────────────────────────────────────────────────────────────────
Room_Builder_Office_16x16             1         16       14    224     256×224
Modern_Office_MV_1_TILESETS_B-C-D-E   225       48       48    2304    768×768
Modern_Office_MV_2_TILESETS_B-C-D-E   2529      48       48    2304    768×768
Modern_Office_MV_3_TILESETS_B-C-D-E   4833      48       48    2304    768×768
Modern_Office_MV_Floors_TILESET_A2    7137      48       36    1728    768×576
Modern_Office_MV_Walls_TILESET_A4     8865      48       45    2160    768×720
```

## Layers Array

The `layers` array contains all tile layers and object groups.

### Layer Type 1: Tile Layers

Tile layers contain the actual tile data.

```json
{
  "data": [
    0, 0, 0, ..., 1337, 2400, ..., 0, 0, 0
  ],
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

#### Tile Layer Properties

| Property | Type | Purpose |
|----------|------|---------|
| `name` | string | Layer identifier (e.g., "Bottom of map floor") |
| `id` | number | Unique layer ID |
| `type` | string | "tilelayer" for tile layers |
| `data` | number[] | Array of tile GIDs (one per tile in the map) |
| `width` | number | Layer width in tiles (same as map width) |
| `height` | number | Layer height in tiles (same as map height) |
| `opacity` | number | 0.0 (transparent) to 1.0 (opaque) |
| `visible` | boolean | Whether layer is visible in editor |
| `x` | number | Horizontal offset (usually 0) |
| `y` | number | Vertical offset (usually 0) |

#### Tile Data Array

The `data` array contains one number per tile in the map, in row-major order:

```
Array Index   Map Position
───────────────────────────
0             (0, 0)         First tile, top-left
1             (1, 0)         Second tile in first row
50            (0, 1)         First tile of second row
2000          (49, 39)       Last tile, bottom-right

Total: 50 tiles × 40 tiles = 2000 entries per layer
```

##### Tile GID Reference

```
Value  Meaning
─────────────────────
0      Empty tile (no tile)
1-224  Room_Builder_Office_16x16
225+   Depends on tileset ranges
```

### Layer Type 2: Object Groups

Object groups contain game objects like NPCs, items, etc.

```json
{
  "id": 20,
  "name": "npc_spawns",
  "objects": [
    {
      "id": 1,
      "name": "boss_npc",
      "type": "npc",
      "x": 400,
      "y": 320,
      "width": 32,
      "height": 32,
      "visible": true,
      "properties": [
        {
          "name": "dialog_key",
          "type": "string",
          "value": "boss_welcome"
        }
      ]
    }
  ],
  "opacity": 1,
  "type": "objectgroup",
  "visible": true,
  "x": 0,
  "y": 0
}
```

#### Object Group Properties

| Property | Type | Purpose |
|----------|------|---------|
| `name` | string | Group identifier |
| `id` | number | Unique group ID |
| `type` | string | "objectgroup" for object groups |
| `objects` | object[] | Array of objects in this group |
| `opacity` | number | Group opacity (0.0 to 1.0) |
| `visible` | boolean | Whether visible in editor |
| `x` | number | Horizontal offset |
| `y` | number | Vertical offset |

#### Object Properties

Each object in the `objects` array has:

| Property | Type | Purpose |
|----------|------|---------|
| `id` | number | Unique object ID |
| `name` | string | Object name/identifier |
| `type` | string | Object type (e.g., "npc", "item") |
| `x` | number | World X coordinate in pixels |
| `y` | number | World Y coordinate in pixels |
| `width` | number | Object width in pixels |
| `height` | number | Object height in pixels |
| `visible` | boolean | Whether visible |
| `properties` | object[] | Custom properties (optional) |

## Example: Full Layer Sequence

First map contains these layers in order:

```
Index  ID   Name                                Type
─────────────────────────────────────────────────────────────
0      1    Exterior most wall                  tilelayer
1      2    White layer / barrier walls         tilelayer
2      3    Bottom of map floor                 tilelayer
3      4    Top half of map floor               tilelayer
4      5    collisions                          tilelayer
5      6    Bottom of map walls                 tilelayer
6      7    Top of map walls                    tilelayer
7      8    Top of map background chairs        tilelayer
8      9    Top of map table divider 1          tilelayer
9      10   Top of map table divider 2          tilelayer
10     11   Top of map objects on background... tilelayer
11     12   Top floor wall / background objects tilelayer
12     13   Top of map table dividers           tilelayer
13     14   Top of map objects on main tables   tilelayer
14     15   Top of map main chairs              tilelayer
15     16   Bottom floor paintings              tilelayer
16     17   Bottom floor objects                tilelayer
(17+)  18+  Object groups (npcs, items, etc.)   objectgroup
```

## Special Layers

### Collision Layer
- **Name**: "collisions"
- **ID**: 5
- **Visible**: false (hidden by default)
- **Purpose**: Physics collision boundaries
- **Data**: Non-zero values indicate collision tiles

When rendered:
```
0 = No collision
1-100000 = Collision enabled
```

## Size Calculations

### Array Size
- Tiles per layer: `width × height` = `50 × 40` = 2,000 tiles
- Data array length: 2,000 numbers

### Dimensions
- Width: 50 tiles × 16 px/tile = 800 pixels
- Height: 40 tiles × 16 px/tile = 640 pixels

### Tileset Coverage
- Total tiles available: 1 + 224 + 2304 + 2304 + 2304 + 1728 + 2160 = 11,024 tiles
- Maximum possible unique tiles: All 11,024

## Working with the JSON

### Reading Tile at Position (x, y)
```javascript
const tileIndex = y * width + x;  // For position (x,y)
const gid = layer.data[tileIndex];
```

### Converting World Coordinates to Tile
```javascript
const tileX = Math.floor(worldX / tileWidth);
const tileY = Math.floor(worldY / tileHeight);
const index = tileY * mapWidth + tileX;
const gid = layer.data[index];
```

### Finding Which Tileset a GID Belongs To
```javascript
const tilesets = [
  {name: "Room_Builder_Office_16x16", firstgid: 1},
  {name: "Modern_Office_MV_1_TILESETS_B-C-D-E", firstgid: 225},
  // ... etc
];

function findTileset(gid) {
  for (let i = tilesets.length - 1; i >= 0; i--) {
    if (gid >= tilesets[i].firstgid) {
      return tilesets[i];
    }
  }
  return null;
}
```

## Phaser 3 Integration

When Phaser loads this JSON:

1. **Parse tilesets** - Extract image URLs and metadata
2. **Load images** - Load each tileset PNG file
3. **Create tilemap** - Initialize map with dimensions
4. **Add tilesets** - Register each image as a tileset
5. **Create layers** - Build visual layers from tile data
6. **Parse objects** - Extract object groups for game logic

## File Size & Compression

- **Raw JSON**: ~3 MB (contains 2000 tile values per layer)
- **Gzip compressed**: ~200 KB (good web transmission)
- **In Phaser cache**: Parsed into optimized structures

## Editing the JSON

### Manual Editing (not recommended)
- GID values must be valid (0 or within tileset ranges)
- Layer dimensions must match (50×40)
- Maintain valid JSON syntax

### Safe Editing (recommended)
- Use Tiled Editor GUI
- Export to JSON
- Version control the JSON

### Common Edits
- Change layer visibility: Set `"visible": false`
- Adjust opacity: Set `"opacity": 0.5`
- Rename layer: Change `"name": "new_name"`
- Add objects: Manually insert into `objects` array (verify structure)

## Validation Checklist

When creating or editing:
- [ ] `width` and `height` match (50×40 for first_map)
- [ ] `tilewidth` and `tileheight` are 16
- [ ] Each layer `data` array has exactly 2000 entries
- [ ] GIDs in data arrays are within valid ranges
- [ ] All referenced tilesets exist
- [ ] Layer names are unique
- [ ] JSON is valid (no syntax errors)
- [ ] All required properties present
