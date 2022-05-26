import { Router } from "express";
import fs from "fs"

const router  = Router();

const removeExtension = (fileName)=>{
        return fileName.split(".").shift()
}

const pathRouter = `${__dirname}`
fs.readdirSync(pathRouter).filter((file)=>{
const fileWithOutExt = removeExtension(file)
const skip = ['index'].includes(fileWithOutExt)    
if(!skip){
    
router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`))
 }})

router.get("*",(req, res)=>{
    res.status(404)
    res.send({error: "Not Found"})
})

module.exports=  router;