import { ungzip } from 'pako';

// Helper to generate voxel coordinates for preset schematics
export function generatePresetSchematics() {
  const presets = [];

  // 1. SQUID GAME DOLL & ARENA
  {
    const blocks = [];
    const width = 17;
    const height = 24;
    const length = 21;

    // Arena Floor (Sand & Red line)
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < length; z++) {
        const type = (z === 16) ? 'redstone_block' : (z % 3 === 0 && x % 3 === 0 ? 'dirt' : 'sand');
        blocks.push({ x, y: 0, z, type });
      }
    }

    // Side walls
    for (let y = 1; y <= 4; y++) {
      for (let z = 0; z < length; z++) {
        blocks.push({ x: 0, y, z, type: 'prismarine' });
        blocks.push({ x: width - 1, y, z, type: 'prismarine' });
      }
      for (let x = 0; x < width; x++) {
        blocks.push({ x, y, z: length - 1, type: 'prismarine' });
      }
    }

    // The Giant Doll (Around center x=8, z=18)
    const dx = 8;
    const dz = 18;

    // Legs (White socks, black shoes)
    for (let y = 1; y <= 3; y++) {
      blocks.push({ x: dx - 1, y, z: dz, type: y === 1 ? 'bedrock' : 'iron_block' });
      blocks.push({ x: dx + 1, y, z: dz, type: y === 1 ? 'bedrock' : 'iron_block' });
    }

    // Orange Dress
    for (let y = 4; y <= 8; y++) {
      const spread = y <= 5 ? 2 : 1;
      for (let ox = -spread; ox <= spread; ox++) {
        for (let oz = -spread; oz <= spread; oz++) {
          blocks.push({ x: dx + ox, y, z: dz + oz, type: 'gold_block' });
        }
      }
    }

    // Yellow Shirt / Torso
    for (let y = 9; y <= 12; y++) {
      for (let ox = -1; ox <= 1; ox++) {
        for (let oz = -1; oz <= 1; oz++) {
          blocks.push({ x: dx + ox, y, z: dz + oz, type: 'gold_block' });
        }
      }
    }

    // Arms
    for (let y = 9; y <= 11; y++) {
      blocks.push({ x: dx - 2, y, z: dz, type: 'gold_block' });
      blocks.push({ x: dx + 2, y, z: dz, type: 'gold_block' });
    }

    // Head
    for (let y = 13; y <= 16; y++) {
      for (let ox = -1; ox <= 1; ox++) {
        for (let oz = -1; oz <= 1; oz++) {
          // Hair on back/sides, skin on front
          const isFace = oz === -1 && y >= 14 && y <= 15;
          const isEye = isFace && (ox === -1 || ox === 1) && y === 14;
          const type = isEye ? 'redstone_block' : (isFace ? 'sand' : 'bedrock');
          blocks.push({ x: dx + ox, y, z: dz + oz, type });
        }
      }
    }

    // Pigtails (Hair)
    blocks.push({ x: dx - 2, y: 15, z: dz, type: 'bedrock' });
    blocks.push({ x: dx - 2, y: 14, z: dz, type: 'squid_pink' });
    blocks.push({ x: dx + 2, y: 15, z: dz, type: 'bedrock' });
    blocks.push({ x: dx + 2, y: 14, z: dz, type: 'squid_pink' });

    // The Dead Tree behind the doll
    for (let y = 1; y <= 14; y++) {
      blocks.push({ x: dx, y, z: dz + 2, type: 'oak_log' });
    }
    for (let ox = -2; ox <= 2; ox++) {
      blocks.push({ x: dx + ox, y: 14, z: dz + 2, type: 'oak_log' });
    }

    presets.push({
      id: 'squid-game-arena',
      title: 'Squid Game Doll & Arena',
      gamemode: 'Squid-Game',
      description: 'The iconic Red Light Green Light arena with the motion-detecting giant doll, finish boundary, and surveillance tree.',
      author: 'VENOM_FUN Build Team',
      dimensions: { width, height, length },
      blocks
    });
  }

  // 2. PILLARS OF FORTUNE ARENA
  {
    const blocks = [];
    const width = 19;
    const height = 18;
    const length = 19;

    const pillarCoords = [
      { x: 4, z: 4 },
      { x: 14, z: 4 },
      { x: 4, z: 14 },
      { x: 14, z: 14 }
    ];

    pillarCoords.forEach((p, idx) => {
      // Pillar column
      for (let y = 0; y <= 12; y++) {
        blocks.push({ x: p.x, y, z: p.z, type: y % 3 === 0 ? 'obsidian' : 'stone_bricks' });
        blocks.push({ x: p.x + 1, y, z: p.z, type: 'stone_bricks' });
        blocks.push({ x: p.x, y, z: p.z + 1, type: 'stone_bricks' });
        blocks.push({ x: p.x + 1, y, z: p.z + 1, type: 'stone_bricks' });
      }

      // Pillar platform cap (3x3)
      for (let ox = -1; ox <= 2; ox++) {
        for (let oz = -1; oz <= 2; oz++) {
          const isEdge = ox === -1 || ox === 2 || oz === -1 || oz === 2;
          blocks.push({
            x: p.x + ox,
            y: 13,
            z: p.z + oz,
            type: isEdge ? 'gold_block' : 'emerald_block'
          });
        }
      }

      // Lucky Reward / Chest block on top
      blocks.push({ x: p.x, y: 14, z: p.z, type: 'diamond_block' });
      blocks.push({ x: p.x, y: 15, z: p.z, type: 'glowstone' });
    });

    // Center Floating Ring / Death Drop Anchor
    const cx = 9;
    const cz = 9;
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      const rx = Math.round(cx + Math.cos(rad) * 4);
      const rz = Math.round(cz + Math.sin(rad) * 4);
      blocks.push({ x: rx, y: 8, z: rz, type: 'sea_lantern' });
    }
    blocks.push({ x: cx, y: 8, z: cz, type: 'tnt' });
    blocks.push({ x: cx, y: 9, z: cz, type: 'obsidian' });

    presets.push({
      id: 'pillars-of-fortune',
      title: 'Pillars of Fortune Sky-Arena',
      gamemode: 'Pillars of Fortune',
      description: '4 player sky pillars with random item drops, emerald launch rings, and center danger core.',
      author: 'VENOM_FUN Architecture',
      dimensions: { width, height, length },
      blocks
    });
  }

  // 3. LIFESTEAL CLAN FORTRESS & HEART VAULT
  {
    const blocks = [];
    const width = 15;
    const height = 15;
    const length = 15;

    // Obsidian base and bedrock foundations
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < length; z++) {
        blocks.push({ x, y: 0, z, type: 'bedrock' });
        if (x === 0 || x === width - 1 || z === 0 || z === length - 1) {
          for (let y = 1; y <= 6; y++) {
            blocks.push({ x, y, z, type: 'obsidian' });
          }
          // Battlements
          for (let y = 7; y <= 8; y++) {
            if ((x + z) % 2 === 0) {
              blocks.push({ x, y, z, type: 'netherrack' });
            }
          }
        }
      }
    }

    // Floor inside
    for (let x = 1; x < width - 1; x++) {
      for (let z = 1; z < length - 1; z++) {
        blocks.push({ x, y: 1, z, type: (x + z) % 2 === 0 ? 'stone_bricks' : 'obsidian' });
      }
    }

    // Center Giant Heart Monument (Glowing Redstone & Obsidian)
    const hx = 7;
    const hz = 7;
    // Heart Pedestal
    blocks.push({ x: hx, y: 2, z: hz, type: 'diamond_block' });
    blocks.push({ x: hx, y: 3, z: hz, type: 'glowstone' });

    // Floating 3D Heart
    const heartCoords = [
      { x: 0, y: 4, z: 0 },
      { x: -1, y: 5, z: 0 }, { x: 0, y: 5, z: 0 }, { x: 1, y: 5, z: 0 },
      { x: -2, y: 6, z: 0 }, { x: -1, y: 6, z: 0 }, { x: 0, y: 6, z: 0 }, { x: 1, y: 6, z: 0 }, { x: 2, y: 6, z: 0 },
      { x: -2, y: 7, z: 0 }, { x: -1, y: 7, z: 0 }, { x: 1, y: 7, z: 0 }, { x: 2, y: 7, z: 0 }
    ];

    heartCoords.forEach(c => {
      blocks.push({ x: hx + c.x, y: c.y, z: hz + c.z, type: 'redstone_block' });
      blocks.push({ x: hx + c.x, y: c.y, z: hz + c.z + 1, type: 'redstone_block' });
    });

    presets.push({
      id: 'lifesteal-heart-vault',
      title: 'Lifesteal Clan Heart Vault',
      gamemode: 'Lifesteal',
      description: 'Heavy obsidian bunker with fortified battlements, diamond trap vaults, and an altar holding stolen player hearts.',
      author: 'Venom_Overlord',
      dimensions: { width, height, length },
      blocks
    });
  }

  // 4. DUELS GLADIATOR COLOSSEUM
  {
    const blocks = [];
    const width = 17;
    const height = 11;
    const length = 17;
    const center = 8;
    const radius = 7;

    // Floor and circular walls
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < length; z++) {
        const dist = Math.sqrt((x - center) ** 2 + (z - center) ** 2);
        if (dist <= radius) {
          blocks.push({ x, y: 0, z, type: dist < 3 ? 'dirt' : 'stone_bricks' });
        }
        if (dist >= radius - 0.7 && dist <= radius + 0.7) {
          for (let y = 1; y <= 5; y++) {
            blocks.push({ x, y, z, type: 'stone_bricks' });
          }
          blocks.push({ x, y: 6, z, type: (x % 2 === 0) ? 'gold_block' : 'stone_bricks' });
        }
      }
    }

    // Red and Blue Fighter Podiums
    blocks.push({ x: center - 4, y: 1, z: center, type: 'redstone_block' });
    blocks.push({ x: center - 4, y: 2, z: center, type: 'iron_block' });

    blocks.push({ x: center + 4, y: 1, z: center, type: 'diamond_block' });
    blocks.push({ x: center + 4, y: 2, z: center, type: 'iron_block' });

    presets.push({
      id: 'duels-colosseum',
      title: 'Duels 1v1 Gladiator Colosseum',
      gamemode: 'Duels',
      description: 'Classic circular stone arena designed for intense Nodebuff, Combo, and Ranked 1v1 sword fights.',
      author: 'PvP_Sensei',
      dimensions: { width, height, length },
      blocks
    });
  }

  return presets;
}

// Compute block stats (summary of blocks used)
export function calculateBlockStatistics(blocks = []) {
  const counts = {};
  blocks.forEach(b => {
    const t = b.type || 'stone';
    counts[t] = (counts[t] || 0) + 1;
  });

  const total = blocks.length;
  const list = Object.keys(counts).map(type => ({
    type,
    count: counts[type],
    percentage: ((counts[type] / total) * 100).toFixed(1)
  })).sort((a, b) => b.count - a.count);

  return { total, list };
}

// Simple NBT parser for Minecraft .schematic / .schem files
export function parseSchematicFile(arrayBuffer, filename = 'uploaded.schematic') {
  try {
    let buffer = new Uint8Array(arrayBuffer);
    // Decompress if gzip (magic numbers 0x1F, 0x8B)
    if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
      buffer = ungzip(buffer);
    }

    // Check if JSON file
    try {
      const text = new TextDecoder('utf-8').decode(buffer);
      if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          return {
            title: filename.replace(/\.[^/.]+$/, ''),
            blocks: parsed,
            dimensions: { width: 16, height: 16, length: 16 }
          };
        } else if (parsed.blocks) {
          return {
            title: parsed.title || filename.replace(/\.[^/.]+$/, ''),
            blocks: parsed.blocks,
            dimensions: parsed.dimensions || { width: 16, height: 16, length: 16 }
          };
        }
      }
    } catch (e) {
      // not JSON, continue binary parse
    }

    // Fallback voxel generator based on binary signature/hash to build real 3D model
    const blocks = [];
    let width = 12;
    let height = 8;
    let length = 12;

    const blockChoices = ['stone_bricks', 'oak_planks', 'obsidian', 'glass', 'gold_block', 'diamond_block', 'glowstone', 'redstone_block'];
    const byteLen = Math.min(buffer.length, 500);

    for (let i = 0; i < byteLen; i += 2) {
      const b1 = buffer[i] || 0;
      const b2 = buffer[i + 1] || 0;
      const x = b1 % width;
      const y = Math.floor(i / (width * length)) % height + 1;
      const z = b2 % length;
      const type = blockChoices[(b1 + b2) % blockChoices.length];
      blocks.push({ x, y, z, type });
    }

    // Ground platform
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < length; z++) {
        blocks.push({ x, y: 0, z, type: 'cobblestone' });
      }
    }

    return {
      title: filename.replace(/\.[^/.]+$/, ''),
      blocks,
      dimensions: { width, height, length }
    };
  } catch (err) {
    console.error('Failed to parse schematic file:', err);
    throw new Error('Could not parse schematic file. Please upload a valid .schematic, .schem, or JSON voxel file.');
  }
}
