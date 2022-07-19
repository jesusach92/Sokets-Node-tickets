import { Router } from "express";
import fs from "fs"
import { verifyAuth, verifySession } from "../Middleweres/auth.js";
import agentRouter from "./agent.js";
import AreasRouter from "./area.js";
import authRouter from "./auth.js";
import CategoryRouter from "./category.js";
import ComputerRouter from "./computers.js";
import consumersRouter from "./consumers.js";
import employesRouter from "./employes.js";
import phonesRouter from "./phones.js";
import reassignmentRouter from "./reassignments.js";
import RoleRouter from "./roles.js";
import ticketsRouter from "./tickets.js";
import UserTypeRouter from "./usertypes.js";


const router  = Router();
router.use("/auth",authRouter)
router.use("/",verifyAuth,verifySession)
router.use("/agent", agentRouter);
router.use("/area",AreasRouter)
router.use("/consumers",consumersRouter)
router.use("/employes", employesRouter)
router.use("/category",CategoryRouter)
router.use("/computers", ComputerRouter)
router.use("/phones", phonesRouter)
router.use("/tickets",ticketsRouter)
router.use("/roles", RoleRouter)
router.use("/usertypes", UserTypeRouter)
router.use("/reassignments", reassignmentRouter)
// router.use("/upload",)


/**
 * It takes a file name as a string, splits it into an array of strings, and returns the first element
 * of that array.
 * @param fileName - The name of the file you want to remove the extension from.
 * @returns The file name without the extension.
 */
// const removeExtension = (fileName)=>{
//         return fileName.split(".").shift()
// }

// /* Setting the path to the current directory. */
// const pathRouter = `${__dirname}`

// /* Reading the directory of the current file, filtering out the index file, and then requiring all the
// other files in the directory. */
// fs.readdirSync(pathRouter).filter((file)=>{
// const fileWithOutExt = removeExtension(file)
// const skip = ['index'].includes(fileWithOutExt)    
// if(!skip){
    
// router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`))
//  }})

/* A catch all route that will catch any route that is not defined. */
router.get("*",(req, res)=>{
    res.status(404)
    res.send({error: "Not Found"})
})

export default router;