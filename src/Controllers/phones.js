import { connect } from "../Config/database.js";
import { validatorPhoneNumber } from "../Helpers/validatorData.js";


export const getPhones = async(req, res)=>{
    try {
        const db = await connect();
        const [rows] = await db.query("SELECT * FROM phones;")
        if(rows.length === 0)
        {
            res.status(404).send("No encontramos lo que buscabas")
        }
        else{
            res.status(200).json(rows)
        }
        db.end();
    } catch (error) {
        res.status(500).send("Error del servidor contactar a Soporte")
    }
}
export const getPhone = async(req, res)=>{
    try {
        const db= await connect();
        const [rows] = await db.query("SELECT * FROM phones WHERE fkUser=?;",[
           req.params.id 
        ])
        if(rows.length === 0)
        {
            res.status(404).send("No encontramos lo que buscabas")
        }
        else{
            res.status(200).json(rows)
        }
        db.end()
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor contactar a Soporte")
    }
}

export const addPhone = async (req, res) => {
    try {
      if (validatorPhoneNumber(req.body.numberPhone)) {
        const number = req.body.numberPhone.replace(/ /g, "");
        const db = await connect();
        const [result] = await db.query(
          "INSERT INTO phones (numberPhone, typeNumber, fkUser) VALUES (?,?,?);",
          [number, req.body.typeNumber, req.body.fkUser]
        );
        res.status(200).send("Informacion Agregada Correctamente");
      } else {
        res.status(400).send("Error en el numero de telefono");
      }
    } catch (error) {
      if (error.errno === 1062) {
        res.status(400).send("No puedes ingresar el mismo número");
      } else {
        console.log(error);
        res.status(500).send("Error del servidor contactar a soporte");
      }
    }
  };
 export const updatePhone= async(req, res)=>{
    try {
        if(validatorPhoneNumber(req.body.numberPhone)){
            const db = await connect();
            const [rows]= await db.query("UPDATE phones SET numberPhone=?, typeNumber=? WHERE idphone=?;",[
                req.body.numberPhone,
                req.body.typeNumber,
                req.body.idphone
            ])
            db.end()
            if(rows.affectedRows !== 0){
                res.status(200).send("Actualizado Correctamente")
            }
            else{
                res.status(400).send("Error al procesar tu información")
            }
        }
        else{
            res.status(400).send("Error al procesar tu información")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor contactar a Soporte")
    }
 } 
 export const deletePhone = async(req, res)=>{
    try {
        const db= await connect();
        const [rows]= await db.query("DELETE FROM phones WHERE idphone= ?",[
            req.params.id
        ])
        db.end()
            if(rows.affectedRows !== 0){
                res.status(200).send("Borrado Correctamente")
            }
            else{
                res.status(400).send("Error al procesar tu información")
            }
        }
     catch (error) {
        console.log(error);
     res.status(500).send("Error del servidor contactar a Soporte")    
    }
 }