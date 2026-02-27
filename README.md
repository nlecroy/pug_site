# 🐶 Pug Paradise - Real-Time Web Application

A fun, interactive website featuring pug-themed games, security guides, and a collaborative meme gallery with real-time synchronization!

## 🌟 Features

### Real-Time Synchronization
- **Admin Panel Effects**: When one user activates special effects (confetti, pug rain, themes, etc.), ALL connected users see them in real-time!
- **Meme Uploads**: Upload memes and they instantly appear for everyone viewing the site
- **Live Updates**: Uses WebSocket (Socket.io) for instant communication between all users

### Pages & Content
- **Games**: 4 pug-themed games including Pug Runner, Memory Match, Clicker, and Survivor 3D
- **Memes**: Interactive meme gallery with upload, like, and categorization features
- **Hacks**: Security and tech guides (Kali Linux setup, Nmap commands)
- **Admin Panel**: Special effects and customizations (password: `PUGATTACK6767`)

## 🚀 Running Locally

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Access the site:
- **Local**: http://localhost:8000
- **Network**: http://21.0.0.38:8000 (or your server's IP)

The server will run on port 8000 and bind to all network interfaces (0.0.0.0).

## 🎮 How to Use

### Admin Panel
1. Click the 🔧 icon in the top-right corner
2. Enter password: `PUGATTACK6767`
3. Use various effects that sync to all users:
   - Themes (Dark Mode, Rainbow Mode)
   - Special Effects (Confetti, Pug Rain, Matrix)
   - Text Modifications (Big Text, Wobble, Rainbow)
   - Background Effects (Random Colors, Snow)

### Meme Gallery
1. Navigate to the Memes page
2. **Add via URL**: Paste an image URL and caption
3. **Upload File**: Select an image from your device (max 10MB)
4. Uploaded memes sync to all users in real-time!
5. Delete Mode password: `ITSBUBBA`

## 🛠️ Technical Stack

- **Backend**: Node.js + Express
- **Real-Time**: Socket.io for WebSocket connections
- **File Upload**: Multer for handling meme uploads
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Storage**: File system for uploads, localStorage for memes

## 📁 Project Structure

```
pug_site/
├── server.js              # Node.js/Express server with Socket.io
├── package.json           # Node dependencies
├── pug_site/              # Static files
│   ├── index.html         # Main page (with admin panel)
│   ├── memes.html         # Meme gallery (with upload)
│   ├── style.css          # Styling
│   ├── games/             # Game HTML files
│   └── hacks/             # Security guides
└── uploads/               # User-uploaded memes
```

## 🌐 Deployment

The server is configured to be accessible from the network:
- Binds to `0.0.0.0:8000`
- Accepts connections from any IP
- WebSocket connections work across the network

For production deployment, consider:
- Setting up HTTPS
- Using a process manager (PM2)
- Configuring a reverse proxy (nginx)
- Setting up proper environment variables

## 🔒 Security Notes

- Admin password is hardcoded (for demo purposes)
- File uploads limited to 10MB
- Only image files accepted for memes
- Consider adding rate limiting for production

## 📝 License

ISC

---

Made with 🐶 love and lots of pugs!
