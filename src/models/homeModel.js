const mongoose = require('mongoose');

/* Criando o Schema */
const HomeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: Number,
        required: true
    },
    data_registro: {
        type: Date,
        required: false,
        default: Date.now
    }
}, {timestamps: true});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {

}

module.exports = Home;