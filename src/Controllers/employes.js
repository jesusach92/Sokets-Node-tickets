import { connect } from "../Config/database";
import { passwordCrypt, passwordCompare } from "../Helpers/BCryptPass";

const getEmployes = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM employes;");
    res.json(rows);
    db.end();
  } catch (error) {
    console.log(error);
  }
};

const getEmploye = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM users WHERE idUSer = ?;", [
      req.params.id,
    ]);
    res.json(rows);
    db.end();
  } catch (error) {
    console.log(error);
  }
};

const addEmploye = async (req, res) => {
  try {
    const db = await connect();
    const passwordhash = await passwordCrypt(req.body.passwordEmploye);
    const [[result]] = await db.query("CALL InEmploye(?,?,?,?,?,?);", [
      req.body.userName,
      req.body.nameEmploye,
      req.body.emailEmploye,
      req.body.numberEmploye,
      passwordhash,
      req.body.fkRole
    ]);
    res.send(result);
    db.end();
  } catch (error) {
    console.log(error);
  }
};

const updateEmploye = (req, res) => {
  try {
    const db=await connect()
    const passwordhash = await passwordCrypt(req.body.passwordEmploye)
    
  } catch (error) {
    
  }
};

const deleteEmploye = (req, res) => {
  res.json({ user: 1, user1: 2 });
};

export { getEmployes, getEmploye, deleteEmploye, updateEmploye, addEmploye };
