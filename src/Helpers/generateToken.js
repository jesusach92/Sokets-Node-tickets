import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * It takes an object and returns a token.
 * @param employe - {
 * @returns A promise that resolves to a string.
 */
export const tokenSign = async (employe) => {
  return jwt.sign(
    {
      userName: employe.userName,
      fkRole: employe.fkRole,
      nameEmploye: employe.nameEmploye,
      emailEmploye: employe.emailEmploye,
      numberEmploye: employe.numberEmploye,
    },
    process.env.PASS_JWT,
    {
      expiresIn: "1h",
    }
  );
};

/**
 * It takes a token and returns the decoded token if it's valid, otherwise it returns null.
 * @param token - The token to verify
 * @returns The token is being returned.
 */
export const verifytoken = async (token) => {
  try {
    return jwt.verify(token, process.env.PASS_JWT);
  } catch (e) {
    return null;
  }
};

export const decodeSign = async (token) => {
};
