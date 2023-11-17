const mongoose = require('mongoose');
const colors = require('colors');

/* Função para se conectando ao mongoDB */
const conn = async function() {
    try {
        const conexao = await mongoose.connect(process.env.key1);
        console.log('Conexão como o mongoDB estabelecida com sucesso'.blue.bold);
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
};

module.exports = conn;