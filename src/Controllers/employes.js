import { connect } from "../Config/database.js";
import { passwordCrypt } from "../Helpers/BCryptPass.js";
import {
  validatorEmail,
  validatorSerialNumber,
  validatorUserName,
} from "../Helpers/validatorData.js";

/**
 * It connects to the database, queries the database, and returns the results of the query.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getEmployes = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM employes;");
    res.json(rows);
    db.end();
  } catch (error) {
    console.log(error);
  }
  
};

/**
 * It connects to the database, queries the database for a user with the id of the request parameter,
 * and returns the result as a JSON object.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getEmploye = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM users WHERE idUSer = ?;", [
      req.params.id,
    ]);
    res.json(rows);
    db.end();
  } catch (error) {
    console.log(error);
  }
};

/**
 * It takes a request, validates the request, and then sends a response
 * @param req - the request object
 * @param res - the response object
 */
export const addEmploye = async (req, res) => {
  try {
    if (validatorUserName(req.body.userName)) {
      if (validatorEmail(req.body.emailEmploye)) {
        const db = await connect();
        const passwordhash = await passwordCrypt(req.body.passwordEmploye);
        const [[result]] = await db.query("CALL InEmploye(?,?,?,?,?,?);", [
          req.body.userName,
          req.body.nameEmploye,
          req.body.emailEmploye,
          req.body.numberEmploye,
          passwordhash,
          req.body.fkRole,
        ]);
        res.send(result);
        db.end();
      } else {
        res.status(400).send("Email Invalido");
      }
    } else {
      res.status(400).send("Nombre de Usuario Invalido");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * It takes the request body, validates the data, and then updates the database.
 * @param req - The request object.
 * @param res - the response object
 */
export const updateEmploye = async (req, res) => {
  try {
    if (validatorUserName(req.body.userName)) {
      if (validatorEmail(req.body.emailEmploye)) {
        const db = await connect();
        const passwordhash = await passwordCrypt(req.body.passwordEmploye);
        const [[result]] = await db.query("CALL UpdateEmploye(?,?,?,?,?,?)", [
          req.body.idemploye,
          req.body.userName,
          req.body.nameEmploye,
          req.body.emailEmploye,
          passwordhash,
          req.body.fkRole,
        ]);
        res.send(result);
        db.end();
      } else {
        res.status(400).send("Email Invalido");
      }
    } else {
      res.status(400).send("Nombre de Usuario Invalido");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * It takes a serial number and an employee id, and if the serial number is valid, it inserts the
 * serial number and employee id into the computers table.
 * @param req - The request object.
 * @param res - the response object
 */
export const asingComputer = async (req, res) => {
  try {
    if (validatorSerialNumber(req.body.serialNumber)) {
      const db = await connect();
      const result = await db.query(
        "INSERT INTO computers(serialNumber,fkEmploye) VALUES (?,?);",
        [req.body.serialNumber, req.body.idEmploye]
      );
      res.status(200).send(result);
      db.end();
    } else {
      res.status(400).send("Numero de serie incorrecto");
    }
  } catch (error) {
    console.log(error);
  }
};

export const reasingComputer= async(req, res)=>{
  try {
    const db = await connect();
    const result= await db.query("UPDATE computers SET fkEmploye = ? WHERE idComputer = ?;",[
      req.body.fkEmploye,
      req.body.idComputer
    ])
    res.status(200).send("Reasignacion realizada correctamente");
    db.end();
  } catch (error) {
    console.log(error)
    res.status(400).send("Ha ocurrido un error")
  }
}