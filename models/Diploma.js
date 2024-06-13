const mongoose = require('mongoose');

const diplomaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    curso: { type: String, required: true },
    dataConclusao: { type: Date, required: true },
    valid: { type: Boolean, required: true }
});

const Diploma = mongoose.model('Diploma', diplomaSchema);

module.exports = Diploma;
