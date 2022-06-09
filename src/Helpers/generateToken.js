import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let RefreshTokens = [];

/**
 * It takes an object and returns a token.
 * @param employe - {
 * @returns A promise that resolves to a string.
 */

export const tokenRefresh = async (employe) => {
  try {
    const RefreshToken = jwt.sign(
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
    RefreshTokens[RefreshToken] = { UserId: employe.fkUser };
    return RefreshToken;
  } catch (error) {
    console.log(error);
  }
};

export const tokenSign = async (employe) => {
  try {
    const token = jwt.sign(
      {
        fkUser: employe.fkUser,
        userName: employe.userName,
        fkRole: employe.fkRole,
      },
      process.env.PASS_JWT,
      {
        expiresIn: "60s",
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
    if (RefreshToken in RefreshTokens) {
      return jwt.verify(RefreshToken, process.env.PASS_JWT_REFRESH);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const DeleteSessionToken = (RefreshToken) => {
  console.log(RefreshTokens);
  try {
    if (RefreshToken in RefreshTokens) {
      delete RefreshTokens[RefreshToken];
    }
  } catch (error) {}
};

export const decodeSign = async (token) => {};
