import { connect } from "../Config/database.js";
import {
  validatorSimpleText,
} from "../Helpers/validatorData.js";

/**
 * It connects to the database, queries the database, and returns the result.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getUserTypes = async (req, res) => {
  try {
    const db = await connect();
    const [result] = await db.query("SELECT * FROM usertypes;");
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * It takes a request and a response, and then it tries to connect to the database, and then it tries
 * to insert a new user type into the database, and then it returns a response to the client.
 * @param req - The request object.
 * @param res - the response object
 */
export const addUserType = async (req, res) => {
  try {
    const db = await connect();
    const [result] = await db.query(
      "INSERT INTO usertypes (userType) values (?)",
      [req.body.userType]
    );
    if (result.insertId > 0) {
      res
        .status(200)
        .send("Informacion Agregada Correctamente");
    } else {
      res
        .status(500)
        .send("Error del servidor contactar a Soporte");
    }
    db.end();
  } catch (error) {
    console.log(error);
  }
};

/**
 * It connects to the database, inserts a new role into the database, and then returns a message to the
 * user.
 * @param req - The request object.
 * @param res - The response object.
 */
export const addRole = async (req, res) => {
  try {
    const db = await connect();
    const [result] = await db.query(
      "INSERT INTO roles (nameRole) VALUES (?);",
      [req.body.nameRole]
    );
    console.log(result);
    if (result.insertId > 0) {
      res.status(200).send("Informacion Agregada Correctamente");
    } else {
      res
        .status(500)
        .send("Error en el servidor contactar a soporte");
    }
    db.end();
  } catch (error) {
    console.log(error);
  }
};

/**
 * It's a function that adds a phone number to a database.
 * @param req - request
 * @param res - the response object
 */

export const addArea = async (req, res) => {
  try {
    if (validatorSimpleText(req.body.nameArea)) {
      const db = await connect();
      const [rows] = await db.query("INSERT INTO area(nameArea) values (?)", [
        req.body.nameArea,
      ]);
      db.end()
      res.status(202).json("Informacion Agregada Correctamente")
    } else {
      res.status(400).send("Error al procesar tu información");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error del servidor contactar a soporte");
  }
};


