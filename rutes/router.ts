import { Router, Request, Response } from 'express';
import Server from '../clases/server';
import { usuarioConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        mensaje: 'Hola - POST'
    });
});

router.post('/mensajes', ( req: Request, res: Response ) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instans;

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
         cuerpo,
        de
    });
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {
    
    const id = req.params.id
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instans;

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
         id,
         cuerpo,
        de
    });
});


//  Servicio para Obtener todos los Id de los Usuarios Contectados

router.get('/usuarios', ( req: Request, res: Response ) => {
    const server = Server.instans;

    server.io.clients( (err: any, clientes: string[]) => {
            if( err ) {
               return res.json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                clientes
            });
    });
});


router.get('/usuarios/detalle', ( req: Request, res: Response ) => {
    console.log('mostrando lista');

    res.json({
        ok: true,
        cliente: usuarioConectados.getlista()
    })

});

export default router;