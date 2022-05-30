import { connect } from "../Config/database"

export const getUserTypes= async(res, req) =>{
    const db = await connect();
    const [result] = await db.query("SELECT * FROM usertypes;")
    if(result){
        res.status(200).json(result)
    }
}

export const addUserType = async (res, req)=>{
    try {
        const db= await connect();
        const [result] = await db.query("INSERT INTO usertypes (userType) values (?)",[
            req.body.userType
        ])
        if(result.insertId > 0)
        {
            res.status(200).json({messager: "Tipo de Usuario Ingresado Correctament"})
        }
        else{
            res.status(500).json({message: "Error del servidor contactar a Soporte"})
        }
        db.end()
    } catch (error) {
        res.status(400).json({message:"error del servidor contactar a soporte"})
    }
}