import { connect } from "../Config/database.js";
import { error400, error404, error500, stateDelete, status202 } from "../Helpers/states.js";
import { validatorSimpleText } from "../Helpers/validatorData.js";

export const getUtypes = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM usertypes;");
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

export const getUtype = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query(
      "SELECT * FROM usertypes WHERE idUserType=?;",
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

export const addUtype = async (req, res) => {
  try {
    if (
      validatorSimpleText(req.body.userType) 
    ) {
      const db = await connect();
      const [rows] = await db.query(
        "INSERT INTO usertypes(userType) VALUES (?);",
        [req.body.userType]
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

export const putUtype = async (req, res) => {
  try {
    if (
      validatorSimpleText(req.body.userType) 
    ) {
      const db = await connect();
      const [rows] = await db.query(
        "UPDATE usertypes SET userType=? WHERE idUserType=?;",
        [req.body.userType, req.body.idUserType]
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

export const deleteUtype = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("DELETE FROM usertypes WHERE iduserType= ?", [
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
