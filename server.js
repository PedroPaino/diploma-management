const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const diplomaRoutes = require('./routes/diplomasRoutes'); // Ajuste o caminho conforme necessário

const app = express();
app.use(express.json()); // Para parsear JSON no corpo das requisições

// Conexão ao MongoDB com MongoClient
const uri = "mongodb+srv://pedropaino:20032005@qrcode.plq0dcb.mongodb.net/?retryWrites=true&w=majority&appName=QRCODE";
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const database = client.db("nomeDoBanco");
        const diplomas = database.collection("diplomas");

        // Definição de rotas relacionadas aos diplomas
        app.post('/diplomas', async (req, res) => {
            try {
                const result = await diplomas.insertOne(req.body);
                res.status(201).json(result);
            } catch (e) {
                console.error(e);
                res.status(500).json({ message: "Error inserting diploma" });
            }
        });

        app.get('/diplomas', async (req, res) => {
            try {
                const diplomasList = await diplomas.find({}).toArray(); // Busca todos os documentos na coleção
                res.json(diplomasList);
            } catch (e) {
                console.error(e);
                res.status(500).json({ message: "Error fetching diplomas" });
            }
        });

        app.put('/diplomas/:id', async (req, res) => {
            const id = req.params.id;
            const updates = req.body;

            try {
                const result = await diplomas.updateOne({ _id: new ObjectId(id) }, { $set: updates });
                if (result.modifiedCount === 0) {
                    return res.status(404).json({ message: "No matching diploma found to update" });
                }
                res.json(result);
            } catch (e) {
                console.error(e);
                res.status(500).json({ message: "Error updating diploma" });
            }
        });

    } catch (e) {
        console.error(e);
    }
}

main();

// Conexão ao MongoDB com Mongoose para autenticação
mongoose.connect('mongodb://localhost:27017/seuDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongoose connected"));

// Usar rotas de autenticação
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
