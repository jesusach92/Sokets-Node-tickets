import { connect } from "../Config/database.js";
import {
  validatorEmail,
  validatorNumber,
  validatorSimpleText,
} from "../Helpers/validatorData.js";
import { passwordCrypt } from "../Helpers/BCryptPass.js";
import { error404, error500 } from "../Helpers/states.js";

/**
 * It connects to the database, queries the database, and returns the results of the query.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getConsumers = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM consumers;");
    if(rows.length !==0){
        res.status(202).json(rows);
    }
    else{
        error404(req, res)
    }
    db.end();
  } catch (error) {
    error500(req, res)
    console.log(error);
  }
};

/**
 * It connects to the database, queries the database for a consumer with the idConsumer =
 * req.params.id, and returns the result as a JSON object.
 * @param req - The request object.
 * @param res - the response object
 */
export const getConsumer = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query(
      "SELECT * FROM consumers WHERE idConsumer = ?;",
      [req.params.id]
    );
    if(rows.length !==0){
        res.status(202).json(rows);
    }
    else{
        error404(req, res)
    }
    db.end();
  } catch (error) {
   error500(req, res, error)
  }
};

export const getConsumerById = async (fkUser)=>{
  try {
    const db = await connect();
    const [rows]= await db.query("SELECT * FROM consumers WHERE fkUser=?;",[
      fkUser
    ])
    db.end();
    return rows
    
  } catch (error) {
    error500(req, res, error)
    console.log(error);
    return error
    
  }
}

/**
 * It takes a name and email from a form, validates them, and then inserts them into a database
 * @param req - The request object.
 * @param res - the response object
 */
export const addConsumer = async (req, res) => {
  try {
    if (validatorSimpleText(req.body.nameUser)) {
      if (validatorEmail(req.body.email)) {
        const passwordHash = await passwordCrypt(req.body.password)
        const db = await connect();
        const [[result]] = await db.query("CALL InConsumer(?,?,?);", [
          req.body.nameUser,
          req.body.email,
          passwordHash
        ]);
        res.status(202).send(result);
        db.end();
      } else {
        error404(req, res)
      }
    } else {
        error404(req, res)
    }
  } catch (error) {
   error500(req, res, error)
  }
};

/**
 * It takes a name, email, and id from the body of a request, validates the name and email, and then
 * updates the name and email of the consumer with the given id.
 * @param req - The request object.
 * @param res - the response object
 */
export const updateConsumer = async (req, res) => {
  try {
    if (validatorSimpleText(req.body.nameUser)) {
      if (validatorEmail(req.body.email)) {
        const passwordHash = await passwordCrypt(req.body.password)
        const db = await connect();
        const [[[result]]] = await db.query("Call UpdateConsumer(?,?,?,?);", [
          req.body.nameUser,
          req.body.email,
          passwordHash,
          req.body.idUser,
        ]);
        db.end();
        res.status(202).send(result);
      } else {
        res.status(400).send("Correo no Valido");
      }
    } else {
      res.status(400).send("Nombre no valido");
    }
  } catch (error) {
    error500(req, res)
    console.log(error);
  }
};

/**
 * It deletes a user from the database.
 * @param req - request
 * @param res - The response object.
 */
export const deleteUser = async (req, res) => {
  try {
    if(validatorNumber(req.params.id)){
    const db= await connect();
    const [result]= await db.query("DELETE FROM users WHERE idUser=?",[
      req.params.id
    ])
    res.status(200).send("Borrado con exito")}
    else{
      res.status(400).send("El parametro debe ser un numero")
    }
  } catch (error) {
    console.log(error);
    error500(req, res)
  }
};


