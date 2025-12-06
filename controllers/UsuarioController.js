import Usuario from "../models/UsuarioModel.js";
import argon2 from "argon2";
import emailRegistro from "../helper/emailRegistro.js";

export const registroUsuario = async(req, res)=>{

    const { nombreCompleto, telefono, correo, clave, confirmarClave } = req.body;

    const existeUsuario = await Usuario.findOne({
        where: {
            correo: req.body.correo
        }
    });

    if(existeUsuario){
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({msg: error.message})
    };

    if(clave !== confirmarClave){
        return res.status(400).json({ msg: "Contraseñas no coinciden" })
    }

    const encriptarClave = await argon2.hash(clave);

    try {
        const usuarioRegistrado = await Usuario.create({
            nombreCompleto: nombreCompleto,
            telefono: telefono,
            correo: correo,
            clave: encriptarClave
        });

        emailRegistro({
            correo,
            nombreCompleto,
            token: usuarioRegistrado.token
        })
    
        res.status(201).json({msg: "Usuario registrado"})
    } catch (error) {
        res.status(400).json({ msg: error.message })   
    }
}


export const modificarUsuario = async (req, res) => {
    const usuario = await Usuario.findOne({
        where: {
            UUID: req.params.id
        }    
    })

    if(!usuario){
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const { nombreCompleto, telefono, rol, clave, confirmarClave } = req.body;

    let hashclave;
    
    if(clave === "" || clave === null){
        hashclave = usuario.clave;
    } else {
        hashclave = await argon2.hash(clave);
    }

    if(clave !== confirmarClave){
        return res.status(400).json({ msg: "Contraseñas no coinciden" })
    }
    try {
        await Usuario.update({
            nombreCompleto: nombreCompleto,
            telefono: telefono,
            rol: rol
        },{
            where: {
                id: usuario.id
            }
        })
        res.status(200).json({msg: "Usuario actualizado correctamente"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const obtenerUsuario = async (req, res) => {
    try {
        const resultado = await Usuario.findAll({
            attributes: ['id','UUID','nombreCompleto','correo','confirmado']
        })
        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
