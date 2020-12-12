const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();
const Producto = require('../models/producto');

//	================
//	Obtener productos
//	================
app.get('/productos', (req, res) => {
    // traer todos los productos
    // populate: usuario, categoria
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({})
        .skip(desde)
        .limit(limite)
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Producto.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    productos,
                    cantidad: conteo
                });
            });
        });
});

//	================
//	Obtener producto por id
//	================
app.get('/productos/:id', (req, res) => {
    // traer todos los productos
    // populate: usuario, categoria

    let id = req.params.id;

    Prodcuto
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .findById( id, (err, productoDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El Id no es correcto'
                }
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    });
});

//	================
//	Crear un nuevo producto
//	================
app.post('/productos', (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    })
});

//	================
//	Modificar un producto
//	================
app.put('/productos/:id', (req, res) => {
    // traer todos los productos
    // populate: usuario, categoria

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no existe';
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {
         
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            })
        })
    })
});

//	================
//	Obtener producto por id
//	================
app.delete('/productos/:id', (req, res) => {

});

module.exports = app;