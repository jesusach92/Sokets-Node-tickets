import { connect } from "../Config/database.js";
import {
  validatorSimpleText,
} from "../Helpers/validatorData.js";


export const getCategories = async(req, res)=>{
try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM category;")
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

export const getCategory = async(req, res)=>{
try {
    const db= await connect();
    const [rows] = await db.query("SELECT * FROM category WHERE idCategory=?;",[
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

export const addCategory = async(req, res)=>{
    try {
        if(validatorSimpleText(req.body.nameCategory) && validatorSimpleText(req.body.Description)){
            const db= await connect();
            const [rows] = await db.query("INSERT INTO category(nameCategory,Description) VALUES (?,?);",[
                req.body.nameCategory,
                req.body.Description
            ])
            db.end()
            res.status(202).send("Informacion Agregada Correctamente")
        }else{
            res.status(400).send("Error al procesar tu información")
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor contactar a Soporte")
    }
}

export const putCategory = async(req, res)=>{
try {
    if(validatorSimpleText(req.body.nameCategory) && validatorSimpleText(req.body.Description)){
        const db = await connect();
        const [rows]= await db.query("UPDATE category SET nameCategory=?, Description=? WHERE idCategory=?;",[
            req.body.nameCategory,
            req.body.Description,
            req.body.idCategory
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
    res.status(500).send("Error del servidor contactar a Soporte")
}
}

export const deleteCategory =  async(req, res)=>{
try {
    const db= await connect();
    const [rows]= await db.query("DELETE FROM category WHERE idCategory= ?",[
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
 res.status(500).send("Error del servidor contactar a Soporte")    
}
}