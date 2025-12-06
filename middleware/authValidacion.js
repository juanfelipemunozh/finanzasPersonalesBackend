import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Token de autenticación no válido' });
    }
  
    const token = authHeader.split(' ')[1];
    let jwtPayload;
  
    try {
      jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      return res.status(401).json({ msg: 'Usuario no autorizado' });
    }
  
    const { id } = jwtPayload;
  
    const newToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.setHeader('token', newToken);
  
    next();
  };


export default checkAuth;


/*
const checkAuth = async (req, res, next) => {
    //console.log('REQ ->', req.headers);
    const token = req.headers['auth'];
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).json({ msg: "Usuario no autorizado" });
    }

    const { id } = jwtPayload;

    const newToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.setHeader('token', newToken);

    next();
}


*/