// Leaderboard and Live Game Stats Engine for VENOM_FUN

export const INITIAL_LEADERBOARD = {
  'squid-game': [
    { rank: 1, username: 'SangWoo_67', wins: 142, gamesPlayed: 210, winRate: '67.6%', squidFinalKills: 89, glassBridgeSurvived: 185, badge: '👑 VIP+' },
    { rank: 2, username: 'GiHun_456', wins: 129, gamesPlayed: 240, winRate: '53.8%', squidFinalKills: 74, glassBridgeSurvived: 160, badge: '⭐ MVP' },
    { rank: 3, username: 'SaeByeok_067', wins: 115, gamesPlayed: 195, winRate: '58.9%', squidFinalKills: 92, glassBridgeSurvived: 144, badge: '🔥 PRO' },
    { rank: 4, username: 'FrontMan_VIP', wins: 98, gamesPlayed: 140, winRate: '70.0%', squidFinalKills: 65, glassBridgeSurvived: 120, badge: '🛡️ GUARD' },
    { rank: 5, username: 'Player_199', wins: 87, gamesPlayed: 180, winRate: '48.3%', squidFinalKills: 41, glassBridgeSurvived: 98, badge: '⚔️ VETERAN' },
    { rank: 6, username: 'DaeSeok_101', wins: 76, gamesPlayed: 165, winRate: '46.1%', squidFinalKills: 55, glassBridgeSurvived: 89, badge: 'MEMBER' },
    { rank: 7, username: 'Shadow_Ninja', wins: 64, gamesPlayed: 130, winRate: '49.2%', squidFinalKills: 38, glassBridgeSurvived: 72, badge: 'MEMBER' },
    { rank: 8, username: 'VenomStriker', wins: 59, gamesPlayed: 110, winRate: '53.6%', squidFinalKills: 45, glassBridgeSurvived: 68, badge: 'MEMBER' }
  ],
  'duels': [
    { rank: 1, username: 'ComboGod_X', elo: 2450, wins: 532, losses: 41, winStreak: 34, kdr: '12.9', division: 'Grandmaster' },
    { rank: 2, username: 'TechnoSpirit', elo: 2380, wins: 489, losses: 55, winStreak: 18, kdr: '8.8', division: 'Master' },
    { rank: 3, username: 'SpeedyClicks', elo: 2210, wins: 412, losses: 78, winStreak: 12, kdr: '5.2', division: 'Master' },
    { rank: 4, username: 'W-TapMaster', elo: 2095, wins: 380, losses: 92, winStreak: 9, kdr: '4.1', division: 'Diamond' },
    { rank: 5, username: 'VenomBlade', elo: 1980, wins: 320, losses: 85, winStreak: 7, kdr: '3.7', division: 'Diamond' },
    { rank: 6, username: 'CritKing_99', elo: 1870, wins: 290, losses: 110, winStreak: 5, kdr: '2.6', division: 'Platinum' },
    { rank: 7, username: 'RodTricker', elo: 1740, wins: 240, losses: 130, winStreak: 4, kdr: '1.8', division: 'Gold' },
    { rank: 8, username: 'ArrowSniper', elo: 1680, wins: 215, losses: 125, winStreak: 3, kdr: '1.7', division: 'Gold' }
  ],
  'pillars of fortune': [
    { rank: 1, username: 'VoidLord_99', wins: 210, knockouts: 640, roundsSurvived: 1420, luckyLoots: 890, tier: 'Titan' },
    { rank: 2, username: 'PillarClimber', wins: 185, knockouts: 580, roundsSurvived: 1210, luckyLoots: 760, tier: 'Apex' },
    { rank: 3, username: 'TNT_Yeeter', wins: 164, knockouts: 530, roundsSurvived: 1090, luckyLoots: 690, tier: 'Apex' },
    { rank: 4, username: 'SkyBridgeKing', wins: 145, knockouts: 420, roundsSurvived: 940, luckyLoots: 580, tier: 'Champion' },
    { rank: 5, username: 'MaceSmasher', wins: 120, knockouts: 390, roundsSurvived: 810, luckyLoots: 510, tier: 'Champion' },
    { rank: 6, username: 'EnderPearler', wins: 105, knockouts: 310, roundsSurvived: 730, luckyLoots: 440, tier: 'Gladiator' },
    { rank: 7, username: 'AnvilDropper', wins: 92, knockouts: 280, roundsSurvived: 650, luckyLoots: 390, tier: 'Gladiator' },
    { rank: 8, username: 'VenomPillar', wins: 88, knockouts: 260, roundsSurvived: 610, luckyLoots: 380, tier: 'Gladiator' }
  ],
  'lifesteal': [
    { rank: 1, username: 'HeartCollector_X', hearts: 38, maxHearts: 40, totalKills: 312, banishedPlayers: 28, revives: 6, clan: 'VENOM' },
    { rank: 2, username: 'BloodReaper', hearts: 35, maxHearts: 40, totalKills: 284, banishedPlayers: 22, revives: 4, clan: 'VENOM' },
    { rank: 3, username: 'ImmortalKnight', hearts: 32, maxHearts: 40, totalKills: 250, banishedPlayers: 19, revives: 9, clan: 'TITANS' },
    { rank: 4, username: 'DarkVampire', hearts: 29, maxHearts: 40, totalKills: 215, banishedPlayers: 15, revives: 3, clan: 'SHADOWS' },
    { rank: 5, username: 'SoulEater_7', hearts: 26, maxHearts: 40, totalKills: 190, banishedPlayers: 12, revives: 5, clan: 'TITANS' },
    { rank: 6, username: 'HeartlessJoe', hearts: 24, maxHearts: 40, totalKills: 175, banishedPlayers: 11, revives: 2, clan: 'ECLIPSE' },
    { rank: 7, username: 'CrimsonBlade', hearts: 21, maxHearts: 40, totalKills: 140, banishedPlayers: 8, revives: 1, clan: 'SHADOWS' },
    { rank: 8, username: 'Steve_Noob', hearts: 6, maxHearts: 40, totalKills: 14, banishedPlayers: 0, revives: 0, clan: 'NONE' }
  ]
};

export const LIVE_ACTIVITY_EVENTS = [
  { gamemode: 'lifesteal', text: 'BloodReaper eliminated Steve_Noob and stole a Heart! (Hearts: 36 ❤️)', time: 'just now', type: 'kill' },
  { gamemode: 'squid-game', text: 'GiHun_456 crossed the Glass Bridge without stepping on fake glass!', time: '1m ago', type: 'win' },
  { gamemode: 'duels', text: 'ComboGod_X won 1v1 Nodebuff against RodTricker! (Streak: 35 🔥)', time: '2m ago', type: 'duel' },
  { gamemode: 'pillars of fortune', text: 'VoidLord_99 knocked 2 players off their pillars using a Knockback Stick!', time: '3m ago', type: 'knockout' },
  { gamemode: 'lifesteal', text: 'ImmortalKnight crafted a Revive Beacon and revived ally ShadowRider!', time: '4m ago', type: 'revive' },
  { gamemode: 'squid-game', text: 'SangWoo_67 claimed 1st place in Squid Final against 12 players!', time: '5m ago', type: 'win' }
];

export function getPlayerAvatarUrl(username, size = 64) {
  return `https://mc-heads.net/avatar/${username}/${size}`;
}

export function getPlayerBodyUrl(username) {
  return `https://mc-heads.net/body/${username}/right`;
}
