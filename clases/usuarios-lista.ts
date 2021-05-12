import { Usuario } from './usuario';


export class Userlista {
    private lista: Usuario[] = [];

    constructor() {

    }

    // agregar un usuario
    public agregar( usuario: Usuario ) {
        this.lista.push( usuario );
        console.log(this.lista);
        return usuario;
    }

    public actualizarUser( id: string, nombre: string ) {
        for( let usuario of this.lista ) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando Usuario');
        console.log(this.lista);
    }

    // Optener Lista de Usuarios
    public getlista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );
    } 

    // Regresar un Usuario
    public getUsuario( id: string ) {
        return this.lista.find( usuario => {
            return usuario.id === id;
        })
    }

    // obtener usuario de una sala particular 
    public getUserenSala( sala: string ) {
        return this.lista.filter( usuario => usuario.sala === sala )
    }

    // Borrar un Usuario
    public borrarUser( id: string ) {
        const tempUser = this.getUsuario(id);

        this.lista = this.lista.filter( usuario => {
            return usuario.id === id;
        });
        console.log(this.lista);
        return tempUser;
    }
}