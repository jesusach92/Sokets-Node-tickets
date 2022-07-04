import { connect } from "../Config/database.js";
import { validatorPhoneNumber } from "../Helpers/validatorData.js";

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
        .json({ message: "Tipo de Usuario Ingresado Correctamente" });
    } else {
      res
        .status(500)
        .json({ message: "Error del servidor contactar a Soporte" });
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
      res.status(200).json({ message: "Rol Agregado Correctamente" });
    } else {
      res
        .status(500)
        .json({ message: "Error en el servidor contactar a soporte" });
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
export const addPhone = async (req, res) => {
  try {
    if (validatorPhoneNumber(req.body.numberPhone)) {
      const number = req.body.numberPhone.replace(/ /g,"")
      const db = await connect();
      const [result] = await db.query(
        "INSERT INTO phones (numberPhone, typeNumber, fkUser) VALUES (?,?,?);",
        [number, req.body.typeNumber, req.body.fkUser]
      );
      res.status(200).send(result);
    } else {
      res.status(400).send("Error en el numero de telefono");
    }
  } catch (error) {
    if(error.errno === 1062)
    {
      res.status(400).send("No puedes ingresar el mismo numero")
    }
    else{
      res.status(500).send("Error del servidor contactar a soporte")
    }

  }
};
