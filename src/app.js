import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./Routes/index.js";


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://192.168.1.164:3000",
  methods: "PUT,GET,DELETE,POST ",
    
}));
app.use(morgan("dev"));
app.use(router);

export default app;
