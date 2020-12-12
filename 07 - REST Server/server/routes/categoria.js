const express = require('express');

let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//	================
//	Mostrar todas las categorías
//	================
app.get('/categoria', (req, res) => {

    /** .populate('1','2')
     *  1) Campo que quiero cambiar de mi objeto por los datos correspondientes del mismo.
     *  2) Que campos quiero mostrar de este objeto
     */
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            })
        });
});

//	================
//	Mostrar una categoría por ID
//	================
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById( id, (err, categoriaDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El Id no es correcto'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
});

//	================
//	Crear nueva categoría
//	================
app.post('/categoria', verificaToken, (req, res) => {
    // regresa la nueva categoría
    // req.usuario._id

    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
});

//	================
//	Mostrar todas las categorías
//	================
app.put('/categoria/:id',  (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate( id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });
});

//	================
//	Eliminar todas las categorías
//	================
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    // solo un administrador puede borrar categorías
    // Categoria.findByIdAndRemove

    let id = req.params.id;

    Categoria.findByIdAndRemove( id, (err, categoriaDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }

        res.json({
            ok: true,
            message: 'Categoría Borrada'
        })
    })
});



module.exports = app;