const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 8000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'pug_site')));
app.use('/uploads', express.static(uploadsDir));

// Store global state
let globalState = {
    theme: 'default',
    animationSpeed: 1,
    memes: [],
    effects: []
};

// Load memes from uploads directory
fs.readdir(uploadsDir, (err, files) => {
    if (!err) {
        globalState.memes = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/uploads/${file}`);
    }
});

// API endpoint to get current state
app.get('/api/state', (req, res) => {
    res.json(globalState);
});

// API endpoint for meme upload
app.post('/api/upload-meme', upload.single('meme'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const memeUrl = `/uploads/${req.file.filename}`;
    globalState.memes.push(memeUrl);

    // Broadcast new meme to all connected clients
    io.emit('new-meme', { url: memeUrl });

    res.json({ success: true, url: memeUrl });
});

// API endpoint to get memes
app.get('/api/memes', (req, res) => {
    res.json({ memes: globalState.memes });
});

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Send current state to newly connected client
    socket.emit('initial-state', globalState);

    // Handle admin panel actions
    socket.on('admin-action', (data) => {
        console.log('Admin action received:', data);

        // Update global state based on action
        switch(data.action) {
            case 'theme':
                globalState.theme = data.value;
                break;
            case 'animation':
                globalState.animationSpeed = data.value;
                break;
            case 'effect':
                globalState.effects.push(data.value);
                break;
            case 'clear-effects':
                globalState.effects = [];
                globalState.theme = 'default';
                break;
        }

        // Broadcast to all clients including sender
        io.emit('admin-update', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🐶 Pug Paradise server running on http://0.0.0.0:${PORT}`);
    console.log(`🌐 Access from network: http://21.0.0.38:${PORT}`);
});
