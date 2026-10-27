# ⚡ VENOM_FUN — Modern Gaming & Esports Minecraft Web Platform

A sleek, modern, professional web platform for the **VENOM_FUN** Minecraft Server Network.
Built with **React Router**, modern glassmorphism, responsive dark UI, **Three.js 3D Schematics Studio**, **In-Game Player Authentication Gateway**, and **Real-Time Automated Leaderboards**.

---

## 🧭 Dedicated Multi-Page Routes

The platform is organized into dedicated, high-performance separate pages:

| Route | Page | Access Level | Description |
|---|---|---|---|
| `/` | **Home** | Public | Hero banner with server logo, live ping (`play.venomfun.net`), 1-click IP copy, gamemode overview, top champions, and server architecture specs. |
| `/gamemodes` | **Gamemodes** | Public | Dedicated hub for **Squid-Game**, **Ranked Duels**, **Pillars of Fortune**, and **Lifesteal SMP** with rules, game stages, in-game commands, and 3D arena shortcuts. |
| `/leaderboards` | **Leaderboards** | Public (Top 5) / Member (Full) | Automated real-time leaderboards with 8-second live sync, live combat kill ticker, gamemode tabs, and player search. |
| `/schematics` | **3D Schematics Studio** | Member Only (Protected) | Interactive **Three.js 3D WebGL** viewer: rotate, pan, zoom, layer-by-layer (Y-level) slicer, exact block material counting, block isolation highlighter, and external `.schematic` / `.schem` / `.json` file uploader! |
| `/login` | **Player In-Game Login** | Public | Secure authentication portal where players enter their in-game Minecraft username and server password (compatible with AuthMe / FastLogin / MySQL). Includes one-click test demo accounts. |
| `/profile` | **Player Dashboard** | Member Only (Protected) | High-res Minecraft skin rendering, live Lifesteal hearts meter (`24/40 ❤️`), Duels Elo rating, account sync tokens (`/link`), and claimable daily server rewards with confetti! |

---

## 🎨 Modern Professional Design
- **Modern Obsidian & Glassmorphic UI**: Ultra-clean dark theme with glowing emerald, cyan, and violet accents.
- **Official Server Logo**: Integrated from your Downloads folder (`public/images/server_logo.png`).
- **Typography**: Clean modern typefaces (`Plus Jakarta Sans`, `Inter`, and `JetBrains Mono` for stats).
- **Audio Effects**: Subtle 8-bit sound effects synthesized on the fly via Web Audio API.

---

## 🚀 How to Run

### Production Full-Stack Server
```powershell
npm start
```
Starts Express on **`http://localhost:5000`** serving all API endpoints and frontend routes.

### Frontend Hot-Reload Development
```powershell
npm run client
```
Starts Vite dev server on **`http://localhost:3000`** with instant hot-reloading.

---

## 🔌 Minecraft Server Sync API

To push live stats from your Spigot / Paper / Velocity plugin:

```http
POST http://localhost:5000/api/sync/match
Content-Type: application/json

{
  "gamemode": "lifesteal",
  "winner": "BloodReaper",
  "stats": {
    "hearts": 1,
    "kills": 1
  }
}
```
