import { connect } from "../Config/database";
import { passwordCompare } from "../Helpers/BCryptPass";
import { DeleteSessionToken, tokenRefresh, tokenSign, verifyRefreshToken } from "../Helpers/generateToken";
import { validatorUserName } from "../Helpers/validatorData";

/**
 * It receives a request, validates the user name, connects to the database, queries the database,
 * compares the password, and sends a token or an error message.
 * @param req - The request object.
 * @param res - The response object.
 */

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export const singCtrl = async (req, res) => {
  try {
    const RefreshTokenExist = parseCookie(req.headers.cookie)
    if(RefreshTokenExist && RefreshTokenExist.RefreshToken){
      DeleteSessionToken(RefreshTokenExist.RefreshToken)
    }
    if (validatorUserName(req.body.userName)) {
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
          const RefreshToken = await tokenRefresh(rows)
          const token = await tokenSign(rows);
          res
            .status(200)
            .cookie("RefreshToken", RefreshToken, {
              httpOnly: true,
              maxAge: 7200000,
            })
            .json({
              token,
              idemploye: rows.idemploye,
              nameEmploye: rows.nameEmploye,
              emailEmploye: rows.emailEmploye,
              numberEmploye: rows.numberEmploye,
              fkRole: rows.fkRole,
            });
        } else {
          res.status(401).send("Contraseña Incorrecta");
        }
      } else {
        res.status(404).send("Usuario no encontrado");
      }
      db.end();
    } else {
      res.status(400).send("Error en formato de Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};

export const RefreshToken = async (req, res) => {
  try {
    const cookies = parseCookie(req.headers.cookie);
    if (cookies.RefreshToken) {
      const validate = await verifyRefreshToken(cookies.RefreshToken);
      if (validate) {
        const token = await tokenSign(validate);
        const db = await connect();
        const [
          [{ idemploye, nameEmploye, emailEmploye, numberEmploye, fkRole }],
        ] = await db.query("SELECT * FROM employes WHERE fkUser= ?", [
          validate.fkUser,
        ]);
        res
          .status(200)
          .json({
            token,
            idemploye,
            nameEmploye,
            emailEmploye,
            numberEmploye,
            fkRole,
          });

        db.end();
      } else {
        DeleteSessionToken(cookies.RefreshToken)
        res.status(400).send("Token Invalido Inicia sesion nuevamente");
      }
    } else {
      res.status(403).send("No estas autorizado para está operacion");
    }
  } catch (error) {
    res.status(400).send("Algo anda Mal vuelve a iniciar sesion");
    console.log(error);
  }
};

export const Logout = async (req, res) =>{
  try {
    const {RefreshToken}= parseCookie(req.headers.cookie)
    DeleteSessionToken(RefreshToken)
    res.status(203).send("I hope You have a good day")
  } catch (error) {
    console.log(error)
    res.status(404).send("Algo anda mal vuelve a iniciar sesion")
  }
};
