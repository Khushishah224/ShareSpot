const express = require('express');
const bodyParser = require('body-parser');
const { User, Workspace, Booking, sequelize } = require('./models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const secret = 'your_jwt_secret';

// Endpoint to register a new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, password: hashedPassword });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

// Endpoint to log in a user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, secret);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
});

// Middleware to authenticate users
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.userId = decoded.id;
        next();
    });
};

// Endpoint to get the user dashboard
app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the dashboard!' });
});

// Endpoint to create a new workspace
app.post('/workspaces', authMiddleware, async (req, res) => {
    try {
        const workspace = await Workspace.create(req.body);
        res.json(workspace);
    } catch (error) {
        res.status(400).json({ message: 'Error creating workspace', error });
    }
});

// Endpoint to create a new booking
app.post('/bookings', authMiddleware, async (req, res) => {
    const { workspaceId, startTime, endTime } = req.body;
    try {
        const booking = await Booking.create({ userId: req.userId, workspaceId, startTime, endTime });
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: 'Error creating booking', error });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
