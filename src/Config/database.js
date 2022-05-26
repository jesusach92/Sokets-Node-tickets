import dotenv from 'dotenv'
import mysql from "mysql2/promise";

dotenv.config()

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};



export const connect = async () => {
    return await mysql.createConnection(config);
}