/* Importando os módulos */
const path = require('path');
const colors = require('colors');
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

/* Session e Flash Message */
const storeMongo = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');

/* Segurança - csurf, helmet, cors */
const csurf = require('csurf');
const helmet = require('helmet');
const cors = require('cors');

/* Módulo para se conectar ao banco de dados */
const conn = require('./src/db');

/* Importando os middlewares */
const { middlewareSession, csurfError, csrfToken } = require('./src/middlewares/middleware');

dotenv.config();

/* Invocando o express */
const app = express();

/* Configurando o CORS e o HELMET do express */
app.use(cors());
app.use(helmet());

/* Configurando o view template */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

/* Criando uma pasta estática */
app.use(express.static(path.join(__dirname, 'public')));

/* Se conecatando ao mongoDB */
const conexao = async () => {
    try {
        const bool = await conn();

        if(bool) {
            app.emit('server-on');
        }

    } catch(err) {
        console.error(err);
    }
};
conexao();
/* ========================================================= */

/* Usando o arquivo de rotas */
/* Usando o session */
app.use(session({
    secret: 'secredo',
    resave: true,
    saveUninitialized: true,
    store: storeMongo.create({
        mongoUrl: process.env.KEY1,
        ttl: 60 * 60 * 24 * 7
    }),
    cookie: {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true 
    },
    crypto: {
        secret: 'squirrel'
    }
}));

/* Usando o connect-flash */
app.use(flash());

app.use(csurf());

/* Usando os middlewares */
app.use(middlewareSession);
app.use(csurfError);
app.use(csrfToken);

/* Usando o arquivo de rotas */
app.use(routes);

/* Subindo o servidor */
app.on('server-on', () => {
    const port = process.env.PORT || 4040;
    const host = 'localhost';
    app.listen(port, host, () => {
        console.warn('Express JS inicializando'.yellow.bold);
        console.log(`Express JS - http://${host}:${port}`.bgGreen.black.bold)
    });
});
