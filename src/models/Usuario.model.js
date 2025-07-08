const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
