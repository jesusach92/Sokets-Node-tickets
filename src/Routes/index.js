import { Router } from "express";
import fs from "fs"

const router  = Router();

/**
 * It takes a file name as a string, splits it into an array of strings, and returns the first element
 * of that array.
 * @param fileName - The name of the file you want to remove the extension from.
 * @returns The file name without the extension.
 */
const removeExtension = (fileName)=>{
        return fileName.split(".").shift()
}

/* Setting the path to the current directory. */
const pathRouter = `${__dirname}`

/* Reading the directory of the current file, filtering out the index file, and then requiring all the
other files in the directory. */
fs.readdirSync(pathRouter).filter((file)=>{
const fileWithOutExt = removeExtension(file)
const skip = ['index'].includes(fileWithOutExt)    
if(!skip){
    
router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`))
 }})

/* A catch all route that will catch any route that is not defined. */
router.get("*",(req, res)=>{
    res.status(404)
    res.send({error: "Not Found"})
})

module.exports=  router;