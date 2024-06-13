const mongoose = require('mongoose');
const Diploma = require('./models/Diploma');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongoose connected"))
    .catch(err => console.error("MongoDB connection error:", err));

async function main() {
    try {
        // Adicionar um diploma
        const diplomaDoc = new Diploma({
            nome: "Maria Silva",
            curso: "Engenharia de Software",
            dataConclusao: new Date("2024-06-15"),
            valid: true
        });

        const result = await diplomaDoc.save();
        console.log(`Diploma inserido com o _id: ${result._id}`);

        // Buscar um diploma
        const foundDiploma = await Diploma.findById(result._id);
        console.log("Diploma encontrado:", foundDiploma);

    } catch (e) {
        console.error("Error during database operations:", e);
    } finally {
        // Fechar a conexão com o MongoDB
        await mongoose.disconnect();
        console.log("Mongoose disconnected");
    }
}

main();
