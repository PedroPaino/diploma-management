const express = require('express');
const router = express.Router();
const Diploma = require('../models/Diploma'); // Ajuste o caminho conforme necessário
const QRCode = require('qrcode');

// Rota para gerar QR Code
router.get('/:diplomaId/qr', async (req, res) => {
    const url = `${req.protocol}://${req.get('host')}/validate/${req.params.diplomaId}`;
    try {
        const qrCodeImage = await QRCode.toDataURL(url);
        res.send(`<img src="${qrCodeImage}">`);
    } catch (err) {
        res.status(500).json({ message: "Failed to generate QR Code" });
    }
});
// Supondo que o modelo `Diploma` já está definido e inclui um campo de validade
router.get('/validate/:diplomaId', async (req, res) => {
    const diploma = await Diploma.findById(req.params.diplomaId);
    if (diploma) {
        const message = diploma.isValid ? "This diploma is valid." : "This diploma is not valid.";
        res.send(`<h1>${message}</h1>`);
    } else {
        res.status(404).send('<h1>Diploma not found.</h1>');
    }
});

router.post('/', async (req, res) => {
    if (!req.body.studentName || !req.body.course || !req.body.completionDate) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newDiploma = new Diploma(req.body);
        const result = await newDiploma.save();
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error inserting diploma" });
    }
});


router.get('/', async (req, res) => {
    try {
        const diploma = await Diploma.find({});
        res.json(diploma);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error fetching diplomas" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await Diploma.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: "No matching diploma found to update" });
        }
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error updating diploma" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Diploma.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "No matching diploma found to delete" });
        }
        res.status(204).send();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error deleting diploma" });
    }
});

module.exports = router;
