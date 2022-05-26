import { connect } from "../Config/database"

const getUsers = async (req, res)=>{
    try {
    const db= await connect();
    const [rows] = await db.query("SELECT * FROM users;")
    res.json(rows) 
    console.log(rows)  
    } catch (error) {
        console.log(error)     
    }
}

const getUser = async (req, res)=>{
    try {
        const db= await connect();
        const [rows] = await db.query("SELECT * FROM users WHERE idUSer = ?;",[
            req.params.id
        ])
        res.json(rows) 
        console.log(rows)  
        } catch (error) {
            console.log(error)     
        }
}


const addUser = (req, res)=>{
    res.json({user:1, user1:2})
}


const updateUser = (req, res)=>{
    res.json({user:1, user1:2})
}

const deleteUser = (req, res)=>{

 res.json({user:1, user1:2})
}

export {getUsers, getUser, updateUser, deleteUser, addUser}