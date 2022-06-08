import { connect } from "../Config/database";
import { passwordCompare } from "../Helpers/BCryptPass";
import { tokenSign, verifyRefreshToken} from "../Helpers/generateToken";
import { validatorUserName } from "../Helpers/validatorData";

/**
 * It receives a request, validates the user name, connects to the database, queries the database,
 * compares the password, and sends a token or an error message.
 * @param req - The request object.
 * @param res - The response object.
 */

export const singCtrl = async (req, res) => {
  try {
    if(validatorUserName(req.body.userName))
    {const db = await connect();
    const [[rows]] = await db.query(
      "SELECT * FROM employes WHERE BINARY userName =?;",
      [req.body.userName]
    );
    if (rows?.idemploye) {
      const pass = await passwordCompare(
        req.body.passwordEmploye,
        rows.passwordEmploye
      );
      if (pass) {
        const [token, RefreshToken] = await tokenSign(rows);
        res.status(200).cookie('RefeshToken',RefreshToken,{httpOnly: true, expires: new Date(Date.now() + 7200000)}).json({token, idemploye: rows.idemploye, nameEmploye: rows.nameEmploye, emailEmploye:rows.emailEmploye, numberEmploye: rows.numberEmploye,fkRole: rows.fkRole });
      } else {
        res.status(401).send("Contraseña Incorrecta");

      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
    db.end()
  }
    else{
      res.status(400).send("Error en formato de Usuario")
    }
  } catch (error) {
    console.log(error);
  }
};

export const RefreshToken = async (req, res)=>{
  try {
	  if(req.headers.cookie.split('=').pop()){
	const RefreshToken = await verifyRefreshToken(req.headers.cookie.split('=').pop())
    if(RefreshToken){
		const [token,] = await tokenSign(RefreshToken)
		const db = await connect();
		const [[{idemploye, nameEmploye, emailEmploye, numberEmploye, fkRole}]] = await db.query("SELECT * FROM employes WHERE fkUser= ?",[
			RefreshToken.fkUser
		])
		res.status(200).json({token,idemploye,nameEmploye,emailEmploye,numberEmploye,fkRole})
	
		db.end();
	}
	else{
		res.status(400).send("Token Invalido Inicia sesion nuevamente")
	}
}
else{
	res.status(403).send("No estas autorizado para está operacion")
}	
  } catch (error) {
	  res.status(400).send("Algo anda Mal vuelve a iniciar sesion")
    console.log(error)
  }
}