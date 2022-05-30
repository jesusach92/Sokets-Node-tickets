import { connect } from "../Config/database";
import { passwordCompare } from "../Helpers/BCryptPass";
import { tokenSign, verifytoken } from "../Helpers/generateToken";

export const singCtrl = async (req, res, next) => {
  try {
    const db = await connect();
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
        res.status(200).cookie("Authorization",token).send(token);
      } else {
        res.status(403).send("Contraseña Incorrecta");
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.log(error);
  }
};
