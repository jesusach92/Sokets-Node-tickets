import { connect } from "../Config/database.js";
import { error400, error404, error500, status202 } from "../Helpers/states.js";

export const getAgents = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM agents;");
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

export const getAgent = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM agents WHERE idAgent=?;", [
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
    error500(req, res, error);
  }
};

export const addAgent = async (req, res) => {
  try {
    let Range = req.body.rangeAgent
    const db = await connect();
    const [[{ADMIN}]]= await db.query("SELECT Count(*) AS ADMIN FROM agents WHERE fkArea=? AND rangeAgent=1",[
       req.body.fkArea 
    ])
     if(ADMIN === 1 && Range === 1)Range = 3;
    const [rows] = await db.query(
      "INSERT INTO agents(rangeAgent, fkEmploye, fkArea) VALUES (?,?,?);",
      [Range, req.body.fkEmploye, req.body.fkArea]
    );
    db.end();
    status202(req, res);
  } catch (error) {
    console.log(error);
    error500(req, res, error);
  }
};

export const updateAgent = async (req, res) => {
  try {
    let Range = req.body.rangeAgent
    const db = await connect();
    const [agents]= await db.query("SELECT * FROM agents WHERE fkArea=?;",[
    req.body.fkArea])
    for (let index = 0; index < agents.length; index++) {
        const element = agents[index];
       console.log( element.rangeAgent);
        
    }
    // const [rows] = await db.query(
    //   "UPDATE agents SET rangeAgent=?, fkArea=? WHERE idAgent=?;",
    //   [Range, req.body.fkArea, req.body.idAgent]
    // );
    // db.end();
    // if (rows.affectedRows !== 0) {
    //   status202(req, res);
    // } else {
    //   error400(req, res);
    // }
  } catch (error) {
    console.log(error);
    error500(req, res, error);
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("DELETE FROM agents WHERE idAgent= ?", [
      req.params.id,
    ]);
    db.end();
    if (rows.affectedRows !== 0) {
      status202(req, res);
    } else {
      error400(req, res);
    }
  } catch (error) {
    error500(req, res, error);
  }
};
