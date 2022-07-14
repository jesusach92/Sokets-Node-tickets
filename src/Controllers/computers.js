import { connect } from "../Config/database.js";
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
            res.status(404).send("No encontramos lo que buscabas")
        }
        else{
        res.status(200).send(rows)
        }
        db.end();
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor contactar a Soporte")
    }
}

export const getComputer = async(req, res )=>{
    try {
        const db =  await connect();
        const [rows] = await db.query("SELECT * FROM computers WHERE idComputer = ?;",[
            req.params.id
        ])
        if(rows.length ===0){
            res.status(404).send("No encontramos lo que buscabas")
        }
        else{
        res.status(200).send(rows)
        }
        db.end();
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor contactar a Soporte")
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
        res.status(200).send(result);
        db.end();
      } else {
        res.status(400).send("Numero de serie incorrecto");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Error del servidor contactar a Soporte")
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
        res.status(200).send("Reasignacion realizada correctamente");
      }
      else{
        res.status(400).send("Error al procesar tu información")
      }
      db.end();
    } catch (error) {
      console.log(error)
      res.status(500).send("Error del servidor contactar a Soporte")
    }
  }

export const deleteComputer = async(req, res)=>{
try {
    const db= await connect()
    const [rows]= await db.query("DELETE FROM computers WHERE idComputer=?;",[
        req.params.id
    ])
    if(rows.affectedRows !==0){
        res.status(200).send("Borrado Correctamente");
      }
      else{
        res.status(400).send("Error al procesar tu información")
      }
      db.end();
} catch (error) {
    console.log(error)
res.status(500).send("Error del servidor contactar a Soporte")
}
}
