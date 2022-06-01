import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/", require("./Routes/"));

export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});
export default app;
