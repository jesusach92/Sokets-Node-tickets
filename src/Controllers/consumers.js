import { connect } from "../Config/database"

const getConsumers = async (req, res)=>{
    try {
    const db= await connect();
    const [rows] = await db.query("SELECT * FROM consumers;")
    res.json(rows) 
    db.end() 
    } catch (error) {
        console.log(error)     
    }
}

const getConsumer = async (req, res)=>{
    try {
        const db= await connect();
        const [rows] = await db.query("SELECT * FROM consumers WHERE idConsumer = ?;",[
            req.params.id
        ])
        res.json(rows)
		db.end();  
        } catch (error) {
            console.log(error)     
        }
}


const addConsumer = async(req, res)=>{
    try {
		const db= await connect();
		const [result] = await db.query("CALL InConsumer(?,?);",[
			req.body.nameConsumer,
    		req.body.emailConsumer,
		])
		res.send(result)
		db.end();
	}
    catch (error) {
        console.log(error)
    }
}


const updateUser = (req, res)=>{
    res.json({user:1, user1:2})
}

const deleteUser = (req, res)=>{

 res.json({user:1, user1:2})
}

export {addConsumer, getConsumer, getConsumers, updateUser, deleteUser}