import { connect } from "../Config/database";
import { passwordCompare } from "../Helpers/BCryptPass";
import { tokenSign, verifytoken } from "../Helpers/generateToken";
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
        const token = await tokenSign(rows);
        res.status(200).send(token);
      } else {
        res.status(401).send("Contraseña Incorrecta");
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  }
    else{
      res.status(400).send("Error en formato de Usuario")
    }
  } catch (error) {
    console.log(error);
  }
};


