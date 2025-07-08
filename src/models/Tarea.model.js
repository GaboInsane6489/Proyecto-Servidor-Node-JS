const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    username_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    completada: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);
