import { connect } from "../Config/database.js";

export const getTickets= async(req, res)=>{
try {
    const timestamp = Date.now()
    console.log(timestamp);
    const dataObjet = new Date(timestamp)
    console.log(dataObjet.toLocaleString());
    res.status(200).send("correcto")
} catch (error) {   
    console.log(error);
    res.status(500).send("Error del servidor contactar a Soporte")
    
}
}

export const getTicket = async ( req, res)=>{

}

export const getTicketByAgent = async(req, res)=>{

}

export const getTicketByUser = async(req, res)=>{

}

export const addTicket = async (req, res)=>{

}

export const putTicket = async (req, res)=>{

}
export const deleteTicket = async ( req, res)=>{

}