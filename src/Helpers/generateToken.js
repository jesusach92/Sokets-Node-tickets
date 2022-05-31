import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
      expiresIn: "2h",
    }
  );
};

export const verifytoken = async (token) => {
  try {
    return jwt.verify(token, process.env.PASS_JWT);
  } catch (e) {
    return null;
  }
};

export const decodeSign = async (token) => {
};
