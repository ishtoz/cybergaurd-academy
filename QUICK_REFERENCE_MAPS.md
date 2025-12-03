# Quick Reference: CyberGuard Academy Map System

## Map Specs at a Glance

| Property | Value |
|----------|-------|
| **Map Dimensions** | 50 x 40 tiles |
| **Tile Size** | 16 x 16 pixels |
| **Total Size** | 800 x 640 pixels |
| **Layer Count** | 17 |
| **Tileset Count** | 6 |
| **Total Tiles in Map** | 2000 per layer |

## Tileset Reference

```
Tileset ID  Name                                    FirstGID  Tiles   Purpose
──────────────────────────────────────────────────────────────────────────────
1           Room_Builder_Office_16x16              1         224     Room building
2           Modern_Office_MV_1_TILESETS_B-C-D-E    225       2304    Furniture set 1
3           Modern_Office_MV_2_TILESETS_B-C-D-E    2529      2304    Furniture set 2
4           Modern_Office_MV_3_TILESETS_B-C-D-E    4833      2304    Furniture set 3
5           Modern_Office_MV_Floors_TILESET_A2     7137      1728    Floor textures
6           Modern_Office_MV_Walls_TILESET_A4      8865      2160    Wall textures
```

## Layer Names

```
Collision:
  • collisions (physics only, usually hidden)

Visual Layers:
  • Exterior most wall
  • White layer / barrier walls
  • Bottom of map floor
  • Top half of map floor
  • Bottom of map walls
  • Top of map walls
  • Top of map background chairs
  • Top of map table divider 1
  • Top of map table divider 2
  • Top of map objects on background tables
  • Top floor wall / background objects
  • Top of map table dividers
  • Top of map objects on main tables
  • Top of map main chairs
  • Bottom floor paintings
  • Bottom floor objects
```

## Quick Code Snippets

### Load Map in Phaser
```javascript
// preload()
this.load.tilemapTiledJSON('map', '/assets/maps/first_map.json');
['Modern_Office_MV_1_TILESETS_B-C-D-E', 'Modern_Office_MV_2_TILESETS_B-C-D-E',
 'Modern_Office_MV_3_TILESETS_B-C-D-E', 'Modern_Office_MV_Floors_TILESET_A2',
 'Modern_Office_MV_Walls_TILESET_A4', 'Room_Builder_Office_16x16']
  .forEach(name => this.load.image(name, `/assets/tilesets/${name}.png`));

// create()
const map = this.make.tilemap({ key: 'map' });
const ts = ['Modern_Office_MV_1_TILESETS_B-C-D-E', ...].map(
  name => map.addTilesetImage(name, name)
);
```

### Create Collision
```javascript
const collisionsLayer = map.createLayer('collisions', ts);
collisionsLayer.setCollisionBetween(1, 100000);
this.physics.add.collider(player, collisionsLayer);
```

### Get Tile at Position
```javascript
const tile = layer.getTileAtWorldXY(worldX, worldY);
// tile.index = GID, tile.x = tile X, tile.y = tile Y
```

### Decode Tile GID
```javascript
// Use tilemapConverter.js parseTileGid()
import { parseTileGid } from '@/utils/tilemapConverter.js';
const tileInfo = parseTileGid(gid, tilemapData);
// tileInfo = { tileset, localId, flipped: {h, v, d} }
```

## File Locations

```
Source (Tiled Editor):
  /client/game/assets/maps/first_map.tmx
  /client/game/assets/maps/first_map.js

Web Assets:
  /client/public/assets/maps/first_map.json
  /client/public/assets/tilesets/*.png

Code:
  /client/src/scenes/MainScene.js (uses maps)
  /client/src/utils/tilemapConverter.js (utilities)
```

## Common Tasks

### Find Collision Count
```javascript
const count = collisionsLayer.getCollisionTiles().length;
console.log(`Collision tiles: ${count}`);
```

### Spawn Object on Tile
```javascript
const wx = map.tileToWorldX(tileX);
const wy = map.tileToWorldY(tileY);
createNPC(wx, wy);
```

### Change Layer Visibility
```javascript
layer.setVisible(false);
layer.setAlpha(0.5); // 50% opacity
```

### Fill Tile Region
```javascript
map.fill(tileGID, startX, startY, width, height, layerName);
```

## GID Ranges by Tileset

```
GID Range           Tileset
─────────────────────────────────────────────────
1 - 224            Room_Builder_Office_16x16
225 - 2528         Modern_Office_MV_1
2529 - 4832        Modern_Office_MV_2
4833 - 7136        Modern_Office_MV_3
7137 - 8864        Modern_Office_MV_Floors
8865+              Modern_Office_MV_Walls
```

## Debugging

### Show Collision Layer
```javascript
collisionsLayer.setVisible(true);
```

### Render Debug Graphics
```javascript
const graphics = this.add.graphics().setAlpha(0.75).setDepth(9999);
collisionsLayer.renderDebug(graphics, {
  tileColor: new Phaser.Display.Color(0, 0, 255, 100),
  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
  faceColor: new Phaser.Display.Color(40, 39, 37, 255)
});
```

### Log Map Info
```javascript
console.log(`Map size: ${map.width}x${map.height} tiles`);
console.log(`World size: ${map.widthInPixels}x${map.heightInPixels} px`);
console.log(`Tile size: ${map.tileWidth}x${map.tileHeight} px`);
console.log(`Layers: ${map.layers.length}`);
console.log(`Tilesets: ${map.tilesets.length}`);
```

## Performance Notes

- Map has 2000 tiles per layer × 17 layers
- Collision layer is about 30% dense
- Load time: <50ms on modern hardware
- Runtime: No performance issues with current density

## Known Issues & Solutions

| Issue | Solution |
|-------|----------|
| Tiles not visible | Check all tilesets are loaded |
| Collision not working | Verify `setCollisionBetween()` called |
| Layering wrong | Check layer render order/depth |
| Asset 404 errors | Verify paths in MainScene.js |
| Performance lag | Reduce visible layers or cull off-screen |

## Documentation

- Full Guide: `MAP_STRUCTURE_GUIDE.md`
- Code Docs: See JSDoc in `tilemapConverter.js`
- Tiled Docs: https://doc.mapeditor.org/
- Phaser Docs: https://newdocs.phaser.io/docs/3.60.0/Phaser.Tilemaps
