import { connect } from "../Config/database.js";
import {
  error400,
  error404,
  error500,
  stateDelete,
  status202,
} from "../Helpers/states.js";
import { validatorSimpleText } from "../Helpers/validatorData.js";

export const getreassignments = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM reassignments;");
    if (rows.length === 0) {
      error404(req, res);
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    error500(req, res, error);
  }
};

export const getreassignment = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query(
      "SELECT * FROM reassignments WHERE idReassignment=?;",
      [req.params.id]
    );
    if (rows.length === 0) {
      error404(req, res);
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    console.log(error);
    error500(req, res, error);
  }
};

/**
 * It's a function that receives a request and a response, and it's supposed to add a reassignment
 * request to the database.
 * @param req - request
 * @param res - {
 */
export const addReassignment = async (req, res) => {
  try {
    if (validatorSimpleText(req.body.commentsRe)) {
      const db = await connect();
      const [rows] = await db.query("Call ReassignmentRequest(?,?,?,?,?);", [
        req.body.commentsRe,
        req.body.requestDate,
        req.body.agentProvider,
        req.body.idTicket,
        req.body.agentReciver,
      ]);
      db.end();
      status202(req, res);
    } else {
      error404(req, res);
    }
  } catch (error) {
    console.log(error);
    error500(req, res, error);
  }
};

export const putReassignment = async (req, res) => {
  try {
    if (
      validatorSimpleText(req.body.nameCategory) &&
      validatorSimpleText(req.body.Description)
    ) {
      const db = await connect();
      const [rows] = await db.query(
        "UPDATE category SET nameCategory=?, Description=? WHERE idCategory=?;",
        [req.body.nameCategory, req.body.Description, req.body.idCategory]
      );
      db.end();
      if (rows.affectedRows !== 0) {
        status202(req, res);
      } else {
        error404(req, res);
      }
    } else {
      error400(req, res);
    }
  } catch (error) {
    error500(req, res, error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("DELETE FROM category WHERE idCategory= ?", [
      req.params.id,
    ]);
    db.end();
    if (rows.affectedRows !== 0) {
      stateDelete(req, res);
    } else {
      error400(req, res);
    }
  } catch (error) {
    error500(req, res, error);
  }
};
