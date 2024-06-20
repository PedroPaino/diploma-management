const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Diploma = require('../models/Diploma');
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

// Validar diploma
router.get('/validate/:diplomaId', async (req, res) => {
    const diploma = await Diploma.findById(req.params.diplomaId);
    if (diploma) {
        const message = diploma.isValid ? "This diploma is valid." : "This diploma is not valid.";
        res.send(`<h1>${message}</h1>`);
    } else {
        res.status(404).send('<h1>Diploma not found.</h1>');
    }
});

// Adicionar diploma com validação
router.post('/', [
    body('studentName').not().isEmpty().withMessage('Student name is required'),
    body('course').not().isEmpty().withMessage('Course is required'),
    body('completionDate').isISO8601().withMessage('Completion date must be a valid date')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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

// Listar todos os diplomas
router.get('/', async (req, res) => {
    try {
        const diplomas = await Diploma.find({});
        res.json(diplomas);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error fetching diplomas" });
    }
});

// Atualizar diploma
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

// Deletar diploma
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
