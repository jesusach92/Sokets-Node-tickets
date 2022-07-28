import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



/**
 * It takes an object and returns a token.
 * @param employe - {
 * @returns A promise that resolves to a string.
 */

export const tokenRefresh = async (user) => {
  try {
    const RefreshToken = jwt.sign(
      {
        user
      },
      process.env.PASS_JWT_REFRESH,
      {
        expiresIn: "48h",
      }
    );
    return RefreshToken;
  } catch (error) {
    console.log(error);
  }
};
export const tokenSign = async (user) => {
  try {
    const token = jwt.sign(
      {
        user
      },
      process.env.PASS_JWT,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
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
    } 
   catch (error) {
    console.log(error);
    return null;
  }
};