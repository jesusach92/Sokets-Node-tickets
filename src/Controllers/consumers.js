import { connect } from "../Config/database";
import {
  validatorEmail,
  validatorNumber,
  validatorSimpleText,
  validatorUserName,
} from "../Helpers/validatorData";

const getConsumers = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM consumers;");
    res.json(rows);
    db.end();
  } catch (error) {
    console.log(error);
  }
};

const getConsumer = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query(
      "SELECT * FROM consumers WHERE idConsumer = ?;",
      [req.params.id]
    );
    res.json(rows);
    db.end();
  } catch (error) {
    console.log(error);
  }
};

const addConsumer = async (req, res) => {
  try {
    if (validatorSimpleText(req.body.nameConsumer)) {
      if (validatorEmail(req.body.emailConsumer)) {
        const db = await connect();
        const [[result]] = await db.query("CALL InConsumer(?,?);", [
          req.body.nameConsumer,
          req.body.emailConsumer,
        ]);
        res.send(result);
        db.end();
      } else {
        res.status(400).send("Correo Electronico no Valido");
      }
    } else {
      res.status(400).send("Nombre no Valido");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateConsumer = async (req, res) => {
  try {
    if (validatorSimpleText(req.body.nameConsumer)) {
      if (validatorEmail(req.body.emailConsumer)) {
        const db = await connect();
        const [[result]] = await db.query("Call UpdateConsumer(?,?,?);", [
          req.body.nameConsumer,
          req.body.emailConsumer,
          req.body.IdConsumer,
        ]);
        db.end();
        res.status(200).send(result);
      } else {
        res.status(400).send("Correo no Valido");
      }
    } else {
      res.status(400).send("Nombre no valido");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
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
  }
};

export { addConsumer, getConsumer, getConsumers, updateConsumer, deleteUser };
