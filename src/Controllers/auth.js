import e from "express";
import { connect } from "../Config/database.js";
import { passwordCompare } from "../Helpers/BCryptPass.js";
import { tokenSign, tokenRefresh } from "../Helpers/generateToken.js";
import { validatorEmail } from "../Helpers/validatorData.js";
import {
  addSession,
  DeleteSessionToken,
  updateToken,
  verifyRefreshTokenMid,
} from "../Middleweres/auth.js";
import { getConsumerById } from "./consumers.js";
import { getEmployeById } from "./employes.js";

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
    const RefreshTokenExist =
      req.headers.cookie && parseCookie(req.headers.cookie);
    if (RefreshTokenExist?.RefreshToken) {
      DeleteSessionToken(RefreshTokenExist.RefreshToken);
    }
    if (validatorEmail(req.body.email)) {
      const db = await connect();
      const [[rows]] = await db.query(
        "SELECT * FROM users WHERE BINARY email =?;",
        [req.body.email]
      );
      switch (rows?.fkUserType) {
        case 1:
          const [consumer] = await getConsumerById(rows.idUser);
          const passConsumer = await passwordCompare(
            req.body.password,
            consumer.passwordConsumer
          );
          if (passConsumer) {
            const RefreshToken = await tokenRefresh({
              idUser: consumer.fkUser,
			  type: rows.fkUserType,
              email: consumer.emailConsumer,
            });
            const token = await tokenSign({
              idUser: consumer.fkUser,
              email: consumer.emailConsumer,
            });
            addSession(consumer, token, RefreshToken);
            res
              .status(200)
              .cookie("RefreshToken", RefreshToken, {
                httpOnly: true,
                maxAge: 7200000,
              })
              .json({
                token,
				type: rows.fkUserType,
                nameUser: consumer.nameConsumer,
                email: consumer.emailConsumer,
              });
          } else {
            res.status(404).send("Revisa tus credenciales");
          }
          break;
        case 2:
          const [employe] = await getEmployeById(rows.idUser);
          const passEmploye = await passwordCompare(
            req.body.password,
            employe.passwordEmploye
          );
          if (passEmploye) {
            const RefreshToken = await tokenRefresh({
              idUser: employe.fkUser,
			        type: rows.fkUserType,
              email: employe.emailEmploye,
            });
            const token = await tokenSign({
              idUser: employe.fkUer,
              email: employe.emailEmploye,
            });
            addSession(employe, token, RefreshToken);
            res
              .status(200)
              .cookie("RefreshToken", RefreshToken, {
                httpOnly: true,
                maxAge: 7200000,
              })
              .json({
                token,
				type: rows.fkUserType,
                nameUser: employe.nameEmploye,
                email: employe.emailEmploye,
                numberEmploye: employe.numberEmploye,
                fkRole: employe.fkRole,
              });
          } else {
            res.status(404).send("Revisa tus credenciales");
          }
          break;
        default:
          res.status(404).json({ message: "Revisa tus credenciales" });
          break;
      }
      db.end();
    } else {
      res.status(400).send("Revisa tus credenciales");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Ha ocurrido un error");
  }
};

export const RefreshToken = async (req, res) => {
  try {
    const cookies = req.headers.cookie && parseCookie(req.headers.cookie);
    if (cookies?.RefreshToken) {
      const validate = await verifyRefreshTokenMid(cookies.RefreshToken);
      if (validate) {
        const {user}=validate
        const token = await tokenSign({idUser:user.idUser, email:user.email});
        const db = await connect();
		switch(user.type){
			case 1:
			const [[{nameConsumer, emailConsumer}]] = await db.query("SELECT nameConsumer, emailConsumer FROM consumers WHERE fkUser=?",[
				user.idUser
			])
			updateToken(user.idUser, token)
			res.status(200).json({
				token,type: user.type, nameUser:nameConsumer,email:emailConsumer
			})
			break;
			case 2:
		const [[{ nameEmploye, emailEmploye, numberEmploye, fkRole }]] =
          await db.query("SELECT * FROM employes WHERE fkUser= ?", [
            user.idUser,
          ]);
        updateToken(user.idUser, token);
        res.status(200).json({
          token,
		  type: user.type,
          nameUser: nameEmploye,
          email: emailEmploye,
          numberEmploye,
          fkRole,
        });
			break;
      default:
        res.status(400).send("Algo anda mal")
        break;
		}
        db.end();
      } else {
        DeleteSessionToken(cookies.RefreshToken);
        res.status(401).send("Token Invalido Inicia sesion nuevamente");
      }
    } else {
      res.status(403).send("No estas autorizado para está operacion");
    }
  } catch (error) {
    res.status(400).send("Algo anda Mal vuelve a iniciar sesion");
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  try {
    const { RefreshToken } = parseCookie(req.headers.cookie) || "";
    DeleteSessionToken(RefreshToken);
    res.status(203).send("I hope You have a good day");
  } catch (error) {
    console.log(error);
    res.status(404).send("Algo anda mal vuelve a iniciar sesion");
  }
};
