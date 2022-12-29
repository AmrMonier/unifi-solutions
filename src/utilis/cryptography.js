import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export async function hash