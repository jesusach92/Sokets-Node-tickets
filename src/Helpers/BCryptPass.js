import bcrypt from 'bcrypt'
import dontenv from 'dotenv'

dontenv.config()
const passwordCrypt = async (plaintext) =>{
    const saltsRounds= Number(process.env.SALT_ROUNDS || 10) 
    return await bcrypt.hash(plaintext, saltsRounds)
}

const passwordCompare = async(plaintext, hashPassword) =>{
  return await bcrypt.compare(plaintext, hashPassword)
}
export {passwordCrypt, passwordCompare};