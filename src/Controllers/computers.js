import { connect } from "../Config/database.js";
import { error400, error404, error500, stateDelete, status202 } from "../Helpers/states.js";
import { validatorSerialNumber } from "../Helpers/validatorData.js";

/**
 * It takes a serial number and an employee id, and if the serial number is valid, it inserts the
 * serial number and employee id into the computers table.
 * @param req - The request object.
 * @param res - the response object
 */

export const getComputers = async(req, res)=>{
    try {
        const db = await connect()
        const [rows] = await db.query("SELECT * FROM computers;")
        if(rows.length ===0){
            error404(req, res)
        }
        else{
        res.status(200).json(rows)
        }
        db.end();
    } catch (error) {
        error500(req, res, error)
    }
}

export const getComputer = async(req, res )=>{
    try {
        const db =  await connect();
        const [rows] = await db.query("SELECT * FROM computers WHERE idComputer = ?;",[
            req.params.id
        ])
        if(rows.length ===0){
            error404(req, res)
        }
        else{
        res.status(200).json(rows)
        }
        db.end();
    } catch (error) {
        console.log(error);
        error500(req, res, error)
    }
}

export const addComputer = async (req, res) => {
    try {
      if (validatorSerialNumber(req.body.serialNumber)) {
        const db = await connect();
        const result = await db.query(
          "INSERT INTO computers(serialNumber,fkEmploye,description) VALUES (?,?,?);",
          [req.body.serialNumber, req.body.fkEmploye, req.body.description]
        );
        status202(req, res)
        db.end();
      } else {
        error400(req, res)
      }
    } catch (error) {
      console.log(error);
      error500(req, res, error)
    }
  };
  
  export const updateComputer= async(req, res)=>{
    try {
      const db = await connect();
      const [rows]= await db.query("UPDATE computers SET fkEmploye =?, description=? WHERE idComputer = ?;",[
        req.body.fkEmploye,
        req.body.description,
        req.body.idComputer
      ])
      if(rows.affectedRows !==0){
        status202(req, res)
      }
      else{
        error400(req, res)
      }
      db.end();
    } catch (error) {
      console.log(error)
      error500(req, res, error)
    }
  }

export const deleteComputer = async(req, res)=>{
try {
    const db= await connect()
    const [rows]= await db.query("DELETE FROM computers WHERE idComputer=?;",[
        req.params.id
    ])
    if(rows.affectedRows !==0){
      stateDelete(req, res)
      }
      else{
        error400(req, res)
      }
      db.end();
} catch (error) {
    console.log(error)
    error500(req, res, error)
}
}
