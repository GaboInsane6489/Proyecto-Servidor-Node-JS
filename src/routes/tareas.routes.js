const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea.model');

// Obtener todas las tareas de un usuario
router.get('/:userId', async (req, res) => {
    try {
        const tareas = await Tarea.find({ username_id: req.params.userId });
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
    const { texto, username_id } = req.body;

    if (!texto || !username_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const nuevaTarea = new Tarea({ texto, username_id });
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear tarea' });
    }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
    try {
        await Tarea.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
});

// Marcar tarea como completada o no
router.patch('/:id', async (req, res) => {
    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(
            req.params.id,
            { $set: { completada: req.body.completada } },
            { new: true }
        );
        res.json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
});


module.exports = router;
