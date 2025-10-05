# Full Screen Mario - Remote Controller

A web-based Full Screen Mario game with a remote controller interface using WebSocket communication.

## Features

- 🎮 Play Full Screen Mario in your browser
- 📱 Control the game using a separate controller interface (works on mobile!)
- 🌐 WebSocket-based real-time communication
- 🐳 Docker support for easy deployment

## Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open two browser windows:
   - Controller: `http://localhost:3000/`
   - Game: `http://localhost:3000/game`

4. Start playing! Use the controller to control Mario.

## Docker Deployment

### Using Docker

1. Build the Docker image:
```bash
docker build -t mario-controller .
```

2. Run the container:
```bash
docker run -p 3000:3000 mario-controller
```

### Using Docker Compose

1. Start the service:
```bash
docker-compose up -d
```

2. Stop the service:
```bash
docker-compose down
```

## Deploying to Cloud Services

### Railway.app

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect the Dockerfile and deploy
5. Set environment variable: `PORT=3000`

### Render.com

1. Create account at [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your repository
4. Set:
   - Environment: Docker
   - Port: 3000
5. Click "Create Web Service"

### Fly.io

1. Install Fly CLI: `brew install flyctl` (Mac) or visit [fly.io/docs/hands-on/install-flyctl/](https://fly.io/docs/hands-on/install-flyctl/)
2. Login: `flyctl auth login`
3. Launch app: `flyctl launch`
4. Deploy: `flyctl deploy`

### Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set stack to container: `heroku stack:set container`
5. Deploy: `git push heroku main`

### DigitalOcean App Platform

1. Create account at [digitalocean.com](https://www.digitalocean.com)
2. Go to "App Platform" → "Create App"
3. Connect your repository
4. Set:
   - Type: Dockerfile
   - HTTP Port: 3000
5. Click "Next" and "Launch App"

## How It Works

1. **Server** (`server.js`): Express server with WebSocket support
   - Serves static files
   - Routes: `/` (controller) and `/game` (game)
   - WebSocket relay between controller and game

2. **Controller** (`controller.html`): Virtual game controller
   - D-pad for movement
   - A/B buttons for jump/shoot
   - Start/Select buttons

3. **Game** (`FullScreenMario-master/Source/index.html`): The actual game
   - Receives controller input via WebSocket
   - Translates to keyboard events

## Controls

- **D-Pad**: Move Mario (Up/Down/Left/Right)
- **A Button**: Jump
- **B Button**: Shoot fireballs (when powered up)
- **Start**: Pause/Menu
- **Select**: (Reserved)

## Port Configuration

Default port is `3000`. You can change it with:
```bash
PORT=8080 npm start
```

Or in Docker:
```bash
docker run -p 8080:8080 -e PORT=8080 mario-controller
```

## Architecture

```
┌─────────────┐         ┌──────────┐         ┌─────────┐
│ Controller  │◄───WS───┤  Server  ├───WS───►│  Game   │
│  (Mobile)   │         │ (Relay)  │         │ (Mario) │
└─────────────┘         └──────────┘         └─────────┘
```

## License

This project uses FullScreenMario, which is open source. See `FullScreenMario-master/LICENSE.txt` for details.

## Troubleshooting

**WebSocket connection failed:**
- Ensure server is running
- Check firewall settings
- If using HTTPS, ensure WSS is properly configured

**Game not responding to controller:**
- Check browser console for errors
- Ensure both game and controller are connected (check server logs)
- Try refreshing both pages

**Port already in use:**
- Change the port: `PORT=8080 npm start`


