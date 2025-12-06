import Concepto from "../models/ConceptoModel.js"


export const registrarConcepto = async (req, res) => {
    const { concepto } = req.body;

    const validarConcepto = await Concepto.findOne({
        where: {
            concepto: concepto
        }
    })

    if(validarConcepto){
        return res.status(401).json({msg: "Concepto ya se encuentra registrado"})
    }

    try {
        const nuevoConcepto = await Concepto.create({
            concepto: concepto
        })

        res.status(200).json({msg: "Concepto creado exitosamente"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const obtenerConceptos = async (req, res) => {
    try {
        const resultado = await Concepto.findAll({
            attributes: ["UUID", "concepto"]
        })
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const obtenerUnConcepto = async (req, res) => {
    const validarConcepto = await Concepto.findOne({
        where: {
            UUID: req.params.id
        }
    })

    if(!validarConcepto){
        return res.status(404).json({msg: "Concepto no encontrado"})
    }

    try {
        const resultado = await Concepto.findOne({
            attributes: ['UUID','concepto'],
            where: {
                UUID: req.params.id
            }
        })
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const modificarConcepto = async (req, res) => {
    const validarConcepto = await Concepto.findOne({
        where: {
            UUID: req.params.id
        }
    })

    if(!validarConcepto){
        return res.status(404).json({msg: "Concepto no encontrado"})
    }

    const { concepto } = req.body

    try {
        await Concepto.update({
            concepto: concepto
        }, {
            where: {
                id: validarConcepto.id
            }
        })
        res.status(200).json({msg: "Concepto actualizado correctamente"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const eliminarConcepto = async (req, res) => {
    const validarConcepto = await Concepto.findOne({
        where: {
            UUID: req.params.id
        }
    })

    if(!validarConcepto){
        return res.status(404).json({msg: "Concepto no encontrado"})
    }

    try {
        await Concepto.destroy({
            where: {
                id: validarConcepto.id
            }
        })
        res.status(200).json({msg: "Concepto eliminado correctamente"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}