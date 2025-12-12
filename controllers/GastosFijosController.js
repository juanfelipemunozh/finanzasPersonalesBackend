import GastosFijos from "../models/GastosFijosModel.js"


export const registrarGastoFijo = async (req, res) => {
    const { concepto, valor, observacion, fecha } = req.body;

    const usuarioId = req.usuario.id;

    try {
        await GastosFijos.create({
            concepto: concepto,
            valor: valor,
            observacion: observacion,
            fecha: fecha,
            usuarioId: usuarioId
        })
        res.status(200).json({ msg: "Registro exitoso" })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const obtenerGastosFijos = async (req, res) => {

    try {
        const respuesta = await GastosFijos.findAll({
            attributes: ['UUID', 'concepto', 'valor', 'observacion', 'fecha'],
            where: {
                usuarioId: req.usuario.id
            }
        })
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}


export const obtenerUnGastoFijo = async (req, res) => {
    const validarGasto = await GastosFijos.findOne({
        where: {
            UUID: req.params.id,
            usuarioId: req.usuario.id
        }
    })

    if (!validarGasto) {
        return res.status(401).json({ msg: "Codigo de gasto fijo no es valido" })
    }

    try {
        const respuesta = await GastosFijos.findOne({
            attributes: ['UUID', 'valor', 'concepto', 'observacion', 'fecha'],
            where: {
                UUID: req.params.id,
                usuarioId: req.usuario.id
            }
        })
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const modificarGastoFijo = async (req, res) => {
    const { valor, concepto, observacion, fecha } = req.body;

    const validarGasto = await GastosFijos.findOne({
        where: {
            UUID: req.params.id,
            usuarioId: req.usuario.id
        }
    })

    if (!validarGasto) {
        return res.status(401).json({ msg: "Codigo de gasto fijo no es valido" })
    }

    try {
        await GastosFijos.update({
            valor: valor,
            concepto: concepto,
            observacion: observacion,
            fecha: fecha
        }, {
            where: {
                id: validarGasto.id
            }
        })
        res.status(200).json({ msg: "Actualización exitosa" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


export const eliminarGastoFijo = async (req, res) => {
    const validarGasto = await GastosFijos.findOne({
        where: {
            UUID: req.params.id,
            usuarioId: req.usuario.id
        }
    })

    if (!validarGasto) {
        return res.status(401).json({ msg: "Codigo de gasto fijo no es valido" })
    }

    try {
        await GastosFijos.destroy({
            where: {
                id: validarGasto.id
            }
        })
        res.status(205).json({ msg: "Eliminado exitosamente" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}