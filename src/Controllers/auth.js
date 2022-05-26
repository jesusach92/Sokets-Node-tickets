import { connect } from "../Config/database"

const singCtrl = (req, res, next)=>{
    res.send({messager:"Hello"})
    next();
}
export {singCtrl}