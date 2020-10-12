import Server from './clases/server';
import router from './rutes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

// body parser
server.app.use(bodyParser.urlencoded({extended: true})) // Declarar el body parser
server.app.use(bodyParser.json() ); // convertiro en formato json
// Cors
server.app.use(cors({ origin: true, credentials: true }))
// Rutas
server.app.use('/', router);


server.start( () => {
    console.log('Servidor Corriendo');
});