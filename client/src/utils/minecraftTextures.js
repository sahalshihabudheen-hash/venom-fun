// Procedural pixel-art Minecraft textures generator (16x16)
// Provides CanvasTextures for Three.js and DataURLs for CSS backgrounds

const blockColorPalettes = {
  dirt: ['#866043', '#715037', '#573d2a', '#966c4a', '#5c3e28'],
  grass_top: ['#4c7d24', '#558a28', '#426f1f', '#5e992d', '#3d641d'],
  grass_side: ['#866043', '#715037', '#573d2a', '#4c7d24', '#558a28'],
  stone: ['#686868', '#787878', '#585858', '#888888', '#4c4c4c'],
  cobblestone: ['#4a4a4a', '#606060', '#767676', '#343434', '#8c8c8c'],
  stone_bricks: ['#6e6e6e', '#5a5a5a', '#7d7d7d', '#3c3c3c', '#898989'],
  oak_planks: ['#a07849', '#906a3e', '#7c5a34', '#b38652', '#6b4d2c'],
  oak_leaves: ['#285c16', '#35771d', '#1e4810', '#418f25', '#16360c'],
  oak_log: ['#634d2e', '#533f25', '#45331e', '#735b37', '#382a18'],
  bedrock: ['#2a2a2a', '#181818', '#3c3c3c', '#101010', '#484848'],
  obsidian: ['#120c1f', '#19102c', '#0d0817', '#251740', '#321f57'],
  glass: ['#ffffff', '#d6f0ff', '#e8f7ff', '#b8e2f8', '#9cd5f2'],
  diamond_block: ['#63f7e6', '#49ecd9', '#7efaf0', '#34d4c2', '#21b2a0'],
  gold_block: ['#f8db3e', '#f1cf2b', '#fae259', '#e0be1f', '#c9a815'],
  iron_block: ['#e0e0e0', '#cfcfcf', '#ededed', '#bcbcbc', '#a9a9a9'],
  emerald_block: ['#25c957', '#1eb04c', '#33dc68', '#179840', '#118035'],
  redstone_block: ['#a80f08', '#cb1810', '#8e0c06', '#e5261d', '#720904'],
  tnt: ['#db3b26', '#c42f1b', '#fa4f39', '#ffffff', '#222222'],
  netherrack: ['#631e1e', '#521717', '#752525', '#421111', '#852c2c'],
  glowstone: ['#d9ab55', '#bf903b', '#ebd185', '#997127', '#ffe6a3'],
  sea_lantern: ['#b3dfdb', '#80cbc4', '#e0f2f1', '#4db6ac', '#26a69a'],
  squid_pink: ['#ff2a6d', '#ff0055', '#cc0044', '#ff5c8a', '#990033'],
  prismarine: ['#5a938c', '#467873', '#6ea7a0', '#3a6460', '#7dbbb3'],
  sand: ['#dbcf9c', '#d3c58d', '#e2d8ab', '#c5b77e', '#b6a76e'],
  purpur_block: ['#a97ba9', '#9b6c9b', '#b98bb9', '#8a5c8a', '#784c78']
};

export function createPixelCanvas(blockType = 'dirt', size = 16) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const palette = blockColorPalettes[blockType] || blockColorPalettes.stone;

  // Pseudorandom grid with seed-like deterministic pattern
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let colorIndex = Math.floor(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % palette.length;
      if (colorIndex < 0) colorIndex += palette.length;

      // Special block details
      if (blockType === 'tnt' && y >= 6 && y <= 9) {
        ctx.fillStyle = '#ffffff';
      } else if (blockType === 'stone_bricks' && (y % 4 === 0 || (x % 8 === 0 && Math.floor(y / 4) % 2 === 0) || ((x + 4) % 8 === 0 && Math.floor(y / 4) % 2 === 1))) {
        ctx.fillStyle = '#2d2d2d';
      } else if (blockType === 'glass') {
        if (x === 0 || y === 0 || x === size - 1 || y === size - 1 || (x === y && x < 5) || (x === y + 2 && x < 8)) {
          ctx.fillStyle = palette[0];
        } else {
          ctx.fillStyle = 'rgba(180, 220, 240, 0.25)';
        }
      } else {
        ctx.fillStyle = palette[colorIndex];
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Draw TNT text if TNT
  if (blockType === 'tnt') {
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 4px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TNT', size / 2, 9);
  }

  return canvas;
}

export function getBlockDataUrl(blockType = 'dirt', size = 32) {
  const canvas = createPixelCanvas(blockType, 16);
  // Scale up to crisp 32x32 pixel art
  const scaled = document.createElement('canvas');
  scaled.width = size;
  scaled.height = size;
  const sCtx = scaled.getContext('2d');
  sCtx.imageSmoothingEnabled = false;
  sCtx.drawImage(canvas, 0, 0, size, size);
  return scaled.toDataURL('image/png');
}

export const BLOCK_PALETTE = blockColorPalettes;
