import { connect } from "../Config/database.js";
import { error400, error404, error500, stateDelete, status202 } from "../Helpers/states.js";
import { validatorSimpleText } from "../Helpers/validatorData.js";

export const getAreas = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM area;");
    if (rows.length === 0) {
      error404(req, res)
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    error500(req, res, error)
  }
};

export const getArea = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query(
      "SELECT * FROM area WHERE idArea=?;",
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
    error500(req, res, error)
  }
};

export const addArea = async (req, res) => {
  try {
    if (
      validatorSimpleText(req.body.nameArea)
    ) {
      const db = await connect();
      const [rows] = await db.query(
        "INSERT INTO area(nameArea) VALUES (?);",
        [req.body.nameArea]
      );
      db.end();
        status202(req, res)
    } else {
      error404(req, res)
    }
  } catch (error) {
    console.log(error);
    error500(req, res, error)
  }
};

export const putArea = async (req, res) => {
  try {
    if (
      validatorSimpleText(req.body.nameArea)
    ) {
      const db = await connect();
      const [rows] = await db.query(
        "UPDATE area SET nameArea=? WHERE idArea=?;",
        [req.body.nameArea, req.body.idArea]
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
    console.log(error);
    error500(req, res, error, error)
  }
};

export const deleteArea = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("DELETE FROM area WHERE idArea= ?", [
      req.params.id,
    ]);
    db.end();
    if (rows.affectedRows !== 0) {
        stateDelete(req, res)
    } else {
        error400(req, res)
    }
  } catch (error) {
    error500(req, res, error)
  }
};
