import { connect } from "../Config/database"

 const getUserTypes= async(req, res) =>{
  try {
    const db = await connect();
    const [result] = await db.query("SELECT * FROM usertypes;")
    if(result){
        res.status(200).json(result)
    }
    
  } catch (error) {
    console.log(error)  
  }
}

 const addUserType = async(req, res)=>{
    try {
        const db= await connect();
        const [result] = await db.query("INSERT INTO usertypes (userType) values (?)",[
            req.body.userType
        ])
        if(result.insertId > 0)
        {
            res.status(200).json({message: "Tipo de Usuario Ingresado Correctamente"})
        }
        else{
            res.status(500).json({message: "Error del servidor contactar a Soporte"})
        }
        db.end()
    } catch (error) {
        console.log(error)
    }
}

const addRole = async (req, res)=>{
    try {
        const db = await connect();
        const [result]= await db.query("INSERT INTO roles (nameRole) VALUES (?);",[
            req.body.nameRole
        ])
        console.log(result)
        if(result.insertId>0)
        {
            res.status(200).json({message:"Role Agregado Correctamente"})
        }
        else{
            res.status(500).json({message:"Error en el servidor contactar a soporte"})
        }
        db.end()
    } catch (error) {
        console.log(error)
    }
}



export {addUserType, getUserTypes, addRole};