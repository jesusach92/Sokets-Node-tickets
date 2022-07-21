import { connect } from "../Config/database.js";
import { passwordCrypt } from "../Helpers/BCryptPass.js";
import { error500 } from "../Helpers/states.js";
import {
  validatorEmail,
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
    res.status(200).json(rows);
    db.end();
  } catch (error) {
    error500(req, res)
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
    const [rows] = await db.query("SELECT * FROM employes WHERE fkUser = ?;", [
      req.params.id,
    ]);
    res.json(rows);
    db.end();
  } catch (error) {
    error500(req, res)
    console.log(error);
  }
};

export const getEmployeById = async (fkUer) =>{
  try {
    const db= await connect();
    const [rows]= await db.query("SELECT * FROM employes WHERE fkUser=?;",[
      fkUer
    ])
    db.end()
    return rows
  } catch (error) {
    console.log(error)
    return error
  }
}

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
        const [[result]] = await db.query("CALL InEmploye(?,?,?,?,?,?,?,?);", [
          req.body.userName,
          req.body.nameEmploye,
          req.body.emailEmploye,
          req.body.numberEmploye,
          passwordhash,
          req.body.fkRole,
          req.body.titleJob,
          req.body.fkArea
        ]);
        res.status(200).send(result);
        db.end();
      } else {
        res.status(400).send("Email Invalido");
      }
    } else {
      res.status(400).send("Nombre de Usuario Invalido");
    }
  } catch (error) {
    error500(req, res)
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
        const [[result]] = await db.query("CALL UpdateEmploye(?,?,?,?,?,?,?,?)", [
          req.body.idemploye,
          req.body.userName,
          req.body.nameEmploye,
          req.body.emailEmploye,
          passwordhash,
          req.body.fkRole,
          req.body.JobTitle,
          req.body.fkArea

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
    error500(req, res)
  }
};


export const imageProfile = async(req, res) =>{
  try {
    

  } catch (error) {
    res.status(415).send("Error al cargar el archivo")
    
  }
}