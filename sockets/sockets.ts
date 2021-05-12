import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { Userlista } from "../clases/usuarios-lista";
import { Usuario } from '../clases/usuario';

export const usuarioConectados = new Userlista();


export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {
  const usuario = new Usuario( cliente.id );
  usuarioConectados.agregar( usuario );
  
}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
      usuarioConectados.borrarUser( cliente.id )
      console.log(`Cliente Desconectado  ${cliente.id}`);
    });
    
    io.emit('usuarios-activos', usuarioConectados.getlista());
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server  ) => {
      cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje Recibido', payload);

        io.emit('mensaje-nuevo', payload);

    
      });
}

export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
  cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
    console.log('Configurado', payload.nombre);
    usuarioConectados.actualizarUser( cliente.id, payload.nombre);

    io.emit('usuarios-activos', usuarioConectados.getlista());

    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre}`
    })
    // io.emit('configurar-usuario', payload);
  });
}

export const usuariosActivos = ( cliente: Socket, io: socketIO.Server ) => {
  cliente.on('obtener-usuarios', () => {

    io.to(cliente.id).emit('usuarios-activos', usuarioConectados.getlista());

  });
}
