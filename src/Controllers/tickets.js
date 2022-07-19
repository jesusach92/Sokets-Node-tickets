import { connect } from "../Config/database.js";
import {
  error400,
  error404,
  error500,
  stateDelete,
  status202,
} from "../Helpers/states.js";

export const getTickets = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM tickets;");
    if (rows.length === 0) {
      error404(req, res);
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    console.log(error);
    error500(req, res);
  }
};

export const getTicket = async (req, res, next) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM tickets WHERE idTicket=?;", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      error404(req, res);
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    console.log(error);
    error500(req, res);
  }
};

export const getTicketByAgent = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM tickets WHERE fkAgent=?;", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      error404(req, res);
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    console.log(error);
    error500(req, res);
  }
};

export const getTicketByUser = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM tickets WHERE fkUser=?;", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      error404(req, res);
    } else {
      res.status(200).json(rows);
    }
    db.end();
  } catch (error) {
    console.log(error);
    error500(req, res);
  }
};

export const getTicketByArea = async (req, res)=>{
    try {
        const db = await connect();
        const [rows] = await db.query("SELECT * FROM tickets WHERE fkArea=?;", [
          req.params.id,
        ]);
        if (rows.length === 0) {
          error404(req, res);
        } else {
          res.status(200).json(rows);
        }
        db.end();
      } catch (error) {
        console.log(error);
        error500(req, res);
      }
    }

export const addTicket = async (req, res) => {
  try {
    const db = await connect();
    const dataObjet = new Date(req.body.dateticket * 1000);
    const [[agentFK]] = await db.query("SELECT idAgent FROM agents WHERE fkArea = ? AND rangeAgent=1;",[req.body.areaFk])
    const [[rows]] = await db.query("Call InTicket(?,?,?,?,?,?,?,?);", [
      dataObjet,
      req.body.subjectTicket,
      req.body.descriptionTicket,
      req.body.areaFk,
      req.body.categoryFk,
      req.body.userFk,
      agentFK.idAgent,
      req.body.initialPrority
    ]);
    status202(req, res);
    db.end();
  } catch (error) {
    console.log(error);
    error500(req, res, error);
  }
};

export const putTicket = async (req, res) => {
try {
    const db= await connect()
    const dataObjet =  new Date(req.body.dateTicket);
    const [rows]= await db.query("UPDATE tickets SET fkArea=?, fkCategory=?, Priority=?, dateUpdate=? WHERE idTicket=?",[
        req.body.fkArea,
        req.body.fkCategory,
        req.body.Priority,
        dataObjet,
        req.body.idTicket
    ])
    status202(req, res)
    db.end()
} catch (error) {
    error500(req, res, error)
}

};

export const deleteTicket = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("DELETE FROM tickets WHERE idTicket= ?", [
      req.params.id,
    ]);
    db.end();
    if (rows.affectedRows !== 0) {
      stateDelete(req, res);
    } else {
      error400(req, res);
    }
  } catch (error) {
    console.log(error);
    error500(req, res);
  }
};
