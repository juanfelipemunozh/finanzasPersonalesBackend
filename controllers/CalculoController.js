import Egresos from "../models/EgresosModel.js";
import Ingresos from "../models/IngresosModel.js";
import dbConnectionn from "../config/Database.js"


export const obtenerBalance = async (req, res) => {
    try {
        await dbConnectionn.sync();

        let respuestaEnviada = false;

        const calcularBalance = async () => {
            if (respuestaEnviada) {
                return;
            }

            try {
                let ingresos = await Ingresos.sum('valor');
                let egresos = await Egresos.sum('valor');

                let resultado = ingresos - egresos;
                res.status(200).json(resultado);
                respuestaEnviada = true;
            } catch (error) {
                console.error(error);
                res.status(401).json({ msg: error.message });
                respuestaEnviada = true;
            }

        }

        // calcular Balance inicial
        await calcularBalance();

        // Establecer temporizador para calcular balance cada 10 seg
        const intervalId = setInterval(async () => {
            await calcularBalance();
        }, 10000)

        // Detener el temporizador después de cierto tiempo (opcional)
        setTimeout(() => {
            clearInterval(intervalId)
        }, 60000)

    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}
