import { UUID } from "sequelize";
import generarJWT from "../helper/generarJWT.js";
import Usuario from "../models/UsuarioModel.js";
import argon2 from "argon2";

export const confirmarUsuario = async (req, res) => {

    const { id } = req.params;

    const confirmarUsuario = await Usuario.findOne({
        where: {
            token: id
        }
    });

    if (!confirmarUsuario) {
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message });
    };

    try {
        confirmarUsuario.token = null
        confirmarUsuario.confirmado = true
        await confirmarUsuario.save();
        return res.status(200).json({ msg: "Usuario confirmado correctamente" })

    } catch (error) {
        return res.status(404).json({ msg: error.message })
    }
}


export const autenticarUsuario = async (req, res) => {

    try {
        const { correo } = req.body;

        const usuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        })

        if (!usuario) {
            const error = new Error("Usuario no existe")
            return res.status(403).json({ msg: error.message })
        }

        if (!usuario.confirmado) {
            const error = new Error("Tu cuenta no ha sido confirmada");
            return res.status(403).json({ msg: error.message });
        }

        const verificarClave = await argon2.verify(usuario.clave, req.body.clave)

        if (!verificarClave) {
            return res.status(400).json({ msg: "Contraseña incorrecta" })
        }

        res.json({
            usuario,
            msg: "Usuario autenticado",
            token: generarJWT(usuario.id)
        })

    }   
    catch (error) {
        res.json({msg: error.message})
    }
}

