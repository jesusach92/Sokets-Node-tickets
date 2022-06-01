import { verifytoken } from "../Helpers/generateToken";

export const verifyAuth = async (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ").pop()
      const verifiy = await verifytoken(token)
      if(verifiy){
          next();
      }
      else
      {
          res.status(403).send("Token Invalido")
      }
    } else {
      res.status(403).json({ value: "No Autorizado" }).end();
    }
  };
  
  export const verifiyRole = (role) => async (req, res, next) =>{
    try {
      const token= req.headers.authorization.split(' ').pop()
      const tokenData = await verifytoken(token)
      const roleUser = tokenData.fkRole
      if([].concat(role).includes(roleUser)){ next()}
      else{
      res.status(403).send("Recurso no autorizado")
      }
    } catch (error) {
      res.status(500).send("Error de Servidor Contactar a soporte")
    }
  
  }
  