import express from 'express'
import { SERVER_PORT } from '../globals/eviromments';
import socketIO from 'socket.io';
import http from 'http';

import * as misocket from '../sockets/sockets';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO( this.httpServer );

        this.escucharsocket();
    }

    public static get instans () {
        return this._instance || (this._instance = new this());
    }

    private escucharsocket() {
        console.log('Escuchando Conexion');

        this.io.on('connection', cliente => {
            console.log('Cliente Conectado');
            console.log(cliente.id);

          //Conectar Cliente
          misocket.conectarCliente( cliente, this.io );  
          // Configurar un Usuario
          misocket.configurarUsuario(cliente, this.io);
          // Obtener Usuarios
          misocket.usuariosActivos( cliente, this.io );
          // Escuchar mensajes
          misocket.mensaje(cliente, this.io);

          // desconectar
          misocket.desconectar( cliente, this.io );

        });
    }

    start( callback: Function ) {
        this.httpServer.listen( this.port);
    }
}