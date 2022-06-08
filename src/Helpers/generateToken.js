import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RefreshToken } from "../Controllers/auth";
dotenv.config();

/**
 * It takes an object and returns a token.
 * @param employe - {
 * @returns A promise that resolves to a string.
 */
export const tokenSign = async (employe) => {
  const token = jwt.sign(
    {
      fkUser: employe.fkUser,
      userName: employe.userName,
      fkRole: employe.fkRole,
    },
    process.env.PASS_JWT,
    {
      expiresIn: "120s",
    }
  );
  const RefeshToken = jwt.sign(
    {
      fkUser: employe.fkUser,
      userName: employe.userName,
      fkRole: employe.fkRole,
    },
    process.env.PASS_JWT_REFRESH,
    {
      expiresIn: "2h",
    }
  );
  return [token, RefeshToken];
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

export const verifyRefreshToken = async (RefreshToken) => {
  try { 
    return jwt.verify(RefreshToken, process.env.PASS_JWT_REFRESH);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const decodeSign = async (token) => {};
