const express = require('express');
const router = express.Router();
const Diploma = require('../models/Diploma'); // Ajuste o caminho conforme necessário

// Criar um novo diploma
router.post('/', async (req, res) => {
    try {
        const diploma = new Diploma(req.body);
        await diploma.save();
        res.status(201).json(diploma);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error inserting diploma" });
    }
});

// Buscar todos os diplomas
router.get('/', async (req, res) => {
    try {
        const diplomas = await Diploma.find({});
        res.json(diplomas);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error fetching diplomas" });
    }
});

// Atualizar um diploma
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

// Deletar um diploma
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
