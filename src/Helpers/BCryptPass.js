import bcrypt from 'bcrypt'
import dontenv from 'dotenv'

/* Loading the environment variables from the .env file. */
dontenv.config()

/**
 * This function takes a plaintext password and returns a hashed password.
 * @param plaintext - The plaintext password to be encrypted.
 * @returns A Promise that resolves to a string.
 */

export const passwordCrypt = async (plaintext) =>{
    const saltsRounds= Number(process.env.SALT_ROUNDS || 10) 
    return await bcrypt.hash(plaintext, saltsRounds)
}

/**
 * It takes a plaintext password and a hashed password and returns a boolean value of true or false
 * depending on whether the plaintext password matches the hashed password.
 * @param plaintext - The password that the user entered
 * @param hashPassword - The hashed password that you want to compare against.
 * @returns A promise that resolves to a boolean.
 */
export const passwordCompare = async(plaintext, hashPassword) =>{
  return await bcrypt.compare(plaintext, hashPassword)
}
