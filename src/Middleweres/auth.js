import { verifytoken } from "../Helpers/generateToken";

/**
 * It checks if the request has an authorization header, if it does, it splits the header into an
 * array, and then pops the last element of the array, which is the token. Then it verifies the token,
 * and if it's valid, it calls the next function, otherwise it sends a 403 response.
 * </code>
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that you call when you want to move on to the next middleware.
 */
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
  
 /**
  * It takes a role as a parameter, and returns a function that takes a request, response, and next
  * function as parameters. 
  * 
  * The returned function will verify the token in the request header, and if the role in the token
  * matches the role passed to the function, it will call the next function. 
  * 
  * If the role in the token does not match the role passed to the function, it will send a 403
  * response. 
  * 
  * If there is an error verifying the token, it will send a 500 response.
  * @param role - The role that the user must have to access the resource.
  */
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
  