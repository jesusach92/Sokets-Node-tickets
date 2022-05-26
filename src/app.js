import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/1.0", require("./Routes/"))


export const server = http.createServer(app);
export const io = new Server(server,{
    cors:{
        origin: "*",
        methods: "*"
    }
});
export default app; 