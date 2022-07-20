import { connect } from "../Config/database.js";
import { error400, error404, error500, stateDelete, status202 } from "../Helpers/states.js";
import { validatorSimpleText } from "../Helpers/validatorData.js";

export const getCategories = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM category;");
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

export const getCategory = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query(
      "SELECT * FROM category WHERE idCategory=?;",
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

export const getCategoriesByArea = async(req, res)=>{
    try {
        const db=  await connect();
        const [rows] = await db.query("SELECT * FROM category WHERE fkArea=?",[
        req.params.id
        ])
        if(rows.length>0)
        {
            res.status(200).json(rows)
        }
        else{
            error404(req, res)
        }
    } catch (error) {
    error500(req, res, error)        
    }
}

export const addCategory = async (req, res) => {
  try {
    if (
      validatorSimpleText(req.body.nameCategory) &&
      validatorSimpleText(req.body.Description)
    ) {
      const db = await connect();
      const [rows] = await db.query(
        "INSERT INTO category(nameCategory,Description) VALUES (?,?);",
        [req.body.nameCategory, req.body.Description]
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

export const putCategory = async (req, res) => {
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

export const deleteCategory = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("DELETE FROM category WHERE idCategory= ?", [
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
