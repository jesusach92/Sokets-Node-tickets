import { connect } from "../Config/database.js";
import { error400, error404, error500, stateDelete, status202 } from "../Helpers/states.js";
import { validatorSimpleText } from "../Helpers/validatorData.js";

export const getRoles = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM roles;");
    if (rows.length === 0) {
      error404(req, res)
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    error500(req, res,error)
  }
};

export const getRole = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query(
      "SELECT * FROM roles WHERE idRole=?;",
      [req.params.id]
    );
    if (rows.length === 0) {
      error404(req, res)
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    console.log(error);
    error500(req, res,error)
  }
};

export const addRole = async (req, res) => {
  try {
    if (
      validatorSimpleText(req.body.nameRole)
    ) {
      const db = await connect();
      const [rows] = await db.query(
        "INSERT INTO roles(nameRole) VALUES (?);",
        [req.body.nameRole]
      );
      db.end();
        status202(req, res)
    } else {
      error404(req, res)
    }
  } catch (error) {
    console.log(error);
    error500(req, res,error)
  }
};

export const putRole = async (req, res) => {
  try {
    if (
      validatorSimpleText(req.body.nameRole)
    ) {
      const db = await connect();
      const [rows] = await db.query(
        "UPDATE roles SET nameRole=? WHERE idRole=?;",
        [req.body.nameRole, req.body.idRole]
      );
      db.end();
      if (rows.affectedRows !== 0) {
        status202(req, res)
      } else {
    error404(req, res)    
    }
    } else {
        error400(req, res)
    }
  } catch (error) {
    error500(req, res,error)
  }
};

export const deleteRole = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("DELETE FROM roles WHERE idRole= ?", [
      req.params.id,
    ]);
    db.end();
    if (rows.affectedRows !== 0) {
        stateDelete(req, res)
    } else {
        error400(req, res)
    }
  } catch (error) {
    error500(req, res,error)
  }
};
