const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Rota de registro
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ username: req.body.username, password: hashedPassword });
        await user.save();
        res.status(201).send("User registered");
    } catch (e) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ _id: user._id }, 'secretKey', { expiresIn: '1h' });
            res.json({ token: token });
        } else {
            res.status(401).send("Username or password incorrect");
        }
    } catch (e) {
        res.status(500).json({ message: "Error logging in" });
    }
});

module.exports = router;
