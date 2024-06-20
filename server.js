require('dotenv').config();  // Isso deve estar na linha superior

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const diplomaRoutes = require('./routes/diplomaRoutes');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongoose connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/auth', authRoutes);
app.use('/diplomas', diplomaRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


