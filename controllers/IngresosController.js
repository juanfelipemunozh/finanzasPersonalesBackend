import Ingresos from "../models/IngresosModel.js";


export const registrarIngreso = async (req, res) => {

    try {

        const usuarioId = req.usuario.id;

        const { fecha, concepto, valor } = req.body;

        const nuevoIngreso = await Ingresos.create({
            fecha: fecha,
            concepto: concepto,
            valor: valor,
            usuarioId: usuarioId
        })

        //console.log(nuevoIngreso);
        
        res.status(201).json({ msg: "Ingreso registrado correctamente" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const obtenerIngresos = async (req, res) => {
    try {
        const resultado = await Ingresos.findAll({
            attributes: ['UUID', 'fecha', 'concepto', 'valor'],
            where: {
                usuarioId: req.usuario.id
            }
        })
        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const obtenerUnIngreso = async (req, res) => {
    const ingreso = await Ingresos.findOne({
        where: {
            UUID: req.params.id,
            usuarioId: req.usuario.id
        }
    })
    if (!ingreso) {
        return res.status(404).json({ msg: "Codigo de ingreso no es valido" })
    }

    try {
        const resultado = await Ingresos.findOne({
            attributes: ['UUID', 'fecha', 'concepto', 'valor'],
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


export const modificarIngreso = async (req, res) => {
    const ingreso = await Ingresos.findOne({
        where: {
            UUID: req.params.id,
            usuarioId: req.usuario.id
        }
    })
    if (!ingreso) {
        return res.status(404).json({ msg: "Codigo de ingreso no es valido" })
    }

    const { fecha, concepto, valor } = req.body;

    try {
        await Ingresos.update({
            fecha: fecha,
            concepto: concepto,
            valor: valor
        }, {
            where: {
                id: ingreso.id
            }
        })
        res.status(200).json({ msg: "Ingreso actualizado correctamente" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const eliminarIngreso = async (req, res) => {
    const ingreso = await Ingresos.findOne({
        where: {
            UUID: req.params.id,
            usuarioId: req.usuario.id
        }
    })
    if (!ingreso) {
        return res.status(404).json({ msg: "Codigo de ingreso no es valido" })
    }
    try {
        await Ingresos.destroy({
            where: {
                id: ingreso.id
            }
        })
        res.status(201).json({ msg: "Eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}