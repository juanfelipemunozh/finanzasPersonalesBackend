import { where } from "sequelize";
import Egresos from "../models/EgresosModel.js";


export const registrarEgreso = async (req, res) => {
    const { fecha, concepto, valor, observacion } = req.body;

    const usuarioId = req.usuario.id;

    try {
        const nuevoEgreso = await Egresos.create({
            fecha: fecha,
            concepto: concepto,
            valor: valor,
            observacion: observacion,
            usuarioId: usuarioId
        })
        res.status(200).json({msg: "Egreso registrado correctamente"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const obtenerEgresos = async (req, res) => {
    try {
        const resultado = await Egresos.findAll({
            attributes: ["UUID","fecha","concepto","valor","observacion"],
            where: {    
                usuarioId: req.usuario.id
            }
        })
        res.status(201).json(resultado)
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}

export const obtenerUnEgreso = async (req, res) => {
    const egreso = await Egresos.findOne({
        where: {
            UUID: req.params.id,
            usuarioId: req.usuario.id
        }
    })

    if(!egreso){
        return res.status(401).json({msg: "Codigo de egreso no es valido"})
    }

    try {
        const resultado = await Egresos.findOne({
            attributes: ['UUID','valor','concepto','observacion','fecha'],
            where: {
                UUID: req.params.id,
                usuarioId: req.usuario.id
            }
        })
        res.status(200).json(resultado)
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}


export const modificarEgreso = async (req, res) => {
    const egreso = await Egresos.findOne({
        where: {
            UUID: req.params.id,
            usuarioId: req.usuario.id
        }
    })

    if(!egreso){
        return res.status(401).json({msg: "Codigo de egreso no es valido"})
    }

    const { fecha, concepto, valor, observacion } = req.body;

    try {
        await Egresos.update({
            fecha: fecha,
            concepto: concepto,
            valor: valor,
            observacion: observacion
        }, {
            where: {
                id: egreso.id
            }
        })
        res.status(200).json({msg: "Egreso actualizado correctamente"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const eliminarEgreso = async (req, res) => {
    const egreso = await Egresos.findOne({
        where: {
            UUID: req.params.id
        }
    })

    if(!egreso){
        return res.status(401).json({msg: "Codigo de egreso no es valido"})
    }

    try {
        await Egresos.destroy({
            where: {
                id: egreso.id
            }
        })
        res.status(201).json({msg: "Eliminado correctamente"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}