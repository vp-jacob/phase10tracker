# Phase 10 Tracker 🎴

A simple webapp to track scores for Phase 10 card game.

## Features

- **Player Setup**: Add 2-6 players to start a game
- **Score Tracking**: Log scores after each round
- **Phase Progress**: Track which phase each player is on (1-10)
- **Winner Detection**: Automatically determine the winner

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/vp-jacob/phase10tracker.git
cd phase10tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page-level components
│   ├── PlayerSetup.jsx
│   └── Scoreboard.jsx
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
├── App.jsx         # Main app component
├── App.css         # App-specific styles
├── index.css       # Global styles & CSS variables
└── main.jsx        # Entry point
```

## Phase 10 Scoring Reference

Points are added for cards left in hand at round end:

| Card Type | Points |
|-----------|--------|
| 1-9       | 5      |
| 10-12     | 10     |
| Skip      | 15     |
| Wild      | 25     |

**Winning**: First player to complete Phase 10 with the lowest total score wins!

## Tech Stack

- React 18
- Vite
- CSS (no framework, custom design system)

## License

MIT
