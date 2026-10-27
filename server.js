import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// In-Memory / File-based Database for Live Game Updates
let serverData = {
  status: {
    ip: 'play.venomfun.net',
    bedrockPort: 19132,
    javaPort: 25565,
    online: 1482,
    maxPlayers: 2000,
    motd: '§a§lVENOM_FUN NETWORK §7» §eSquid-Game §7| §cDuels §7| §bLifesteal'
  },
  leaderboards: {
    'squid-game': [
      { rank: 1, username: 'SangWoo_67', wins: 142, gamesPlayed: 210, winRate: '67.6%', squidFinalKills: 89, glassBridgeSurvived: 185 },
      { rank: 2, username: 'GiHun_456', wins: 129, gamesPlayed: 240, winRate: '53.8%', squidFinalKills: 74, glassBridgeSurvived: 160 },
      { rank: 3, username: 'SaeByeok_067', wins: 115, gamesPlayed: 195, winRate: '58.9%', squidFinalKills: 92, glassBridgeSurvived: 144 },
      { rank: 4, username: 'FrontMan_VIP', wins: 98, gamesPlayed: 140, winRate: '70.0%', squidFinalKills: 65, glassBridgeSurvived: 120 },
      { rank: 5, username: 'Player_199', wins: 87, gamesPlayed: 180, winRate: '48.3%', squidFinalKills: 41, glassBridgeSurvived: 98 }
    ],
    'duels': [
      { rank: 1, username: 'ComboGod_X', elo: 2450, wins: 532, losses: 41, winStreak: 34, kdr: '12.9', division: 'Grandmaster' },
      { rank: 2, username: 'TechnoSpirit', elo: 2380, wins: 489, losses: 55, winStreak: 18, kdr: '8.8', division: 'Master' },
      { rank: 3, username: 'SpeedyClicks', elo: 2210, wins: 412, losses: 78, winStreak: 12, kdr: '5.2', division: 'Master' },
      { rank: 4, username: 'W-TapMaster', elo: 2095, wins: 380, losses: 92, winStreak: 9, kdr: '4.1', division: 'Diamond' },
      { rank: 5, username: 'VenomBlade', elo: 1980, wins: 320, losses: 85, winStreak: 7, kdr: '3.7', division: 'Diamond' }
    ],
    'pillars of fortune': [
      { rank: 1, username: 'VoidLord_99', wins: 210, knockouts: 640, roundsSurvived: 1420, luckyLoots: 890, tier: 'Titan' },
      { rank: 2, username: 'PillarClimber', wins: 185, knockouts: 580, roundsSurvived: 1210, luckyLoots: 760, tier: 'Apex' },
      { rank: 3, username: 'TNT_Yeeter', wins: 164, knockouts: 530, roundsSurvived: 1090, luckyLoots: 690, tier: 'Apex' },
      { rank: 4, username: 'SkyBridgeKing', wins: 145, knockouts: 420, roundsSurvived: 940, luckyLoots: 580, tier: 'Champion' },
      { rank: 5, username: 'MaceSmasher', wins: 120, knockouts: 390, roundsSurvived: 810, luckyLoots: 510, tier: 'Champion' }
    ],
    'lifesteal': [
      { rank: 1, username: 'HeartCollector_X', hearts: 38, maxHearts: 40, totalKills: 312, banishedPlayers: 28, revives: 6, clan: 'VENOM' },
      { rank: 2, username: 'BloodReaper', hearts: 35, maxHearts: 40, totalKills: 284, banishedPlayers: 22, revives: 4, clan: 'VENOM' },
      { rank: 3, username: 'ImmortalKnight', hearts: 32, maxHearts: 40, totalKills: 250, banishedPlayers: 19, revives: 9, clan: 'TITANS' },
      { rank: 4, username: 'DarkVampire', hearts: 29, maxHearts: 40, totalKills: 215, banishedPlayers: 15, revives: 3, clan: 'SHADOWS' },
      { rank: 5, username: 'SoulEater_7', hearts: 26, maxHearts: 40, totalKills: 190, banishedPlayers: 12, revives: 5, clan: 'TITANS' }
    ]
  }
};

// --- API ENDPOINTS ---

// Server Status & Live Ping
app.get('/api/status', (req, res) => {
  res.json({ success: true, ...serverData.status });
});

// Leaderboards
app.get('/api/leaderboards', (req, res) => {
  const { gamemode } = req.query;
  if (gamemode && serverData.leaderboards[gamemode]) {
    return res.json({ success: true, gamemode, data: serverData.leaderboards[gamemode] });
  }
  res.json({ success: true, data: serverData.leaderboards });
});

// Live In-Game Event Sync (For Paper / Spigot Plugin to POST)
app.post('/api/sync/match', (req, res) => {
  const { gamemode, winner, stats, apiKey } = req.body;
  if (!gamemode || !winner) {
    return res.status(400).json({ error: 'Missing gamemode or winner' });
  }

  // Update or insert into leaderboard
  if (serverData.leaderboards[gamemode]) {
    const list = serverData.leaderboards[gamemode];
    const existing = list.find(p => p.username.toLowerCase() === winner.toLowerCase());
    if (existing) {
      existing.wins += 1;
      if (stats?.elo) existing.elo += stats.elo;
      if (stats?.hearts) existing.hearts = Math.min(40, existing.hearts + stats.hearts);
    } else {
      list.push({
        rank: list.length + 1,
        username: winner,
        wins: 1,
        ...stats
      });
    }
  }

  res.json({ success: true, message: `Updated stats for ${winner} in ${gamemode}` });
});

// Serve frontend static build
const clientDist = path.join(__dirname, 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  VENOM_FUN MINECRAFT SERVER WEB PLATFORM`);
  console.log(`  Live on: http://localhost:${PORT}`);
  console.log(`  OG Minecraft Retro Theme + 3D Schematics Studio`);
  console.log(`=================================================`);
});
