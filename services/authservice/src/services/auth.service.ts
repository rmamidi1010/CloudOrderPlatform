import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { REPLServer } from "repl";

const users = new Map<string, string>();

export async function register(request: any, response: any) {
  const { email, password } = request.body;

  if (users.has(email)) {
    return response.status(409).send({ message: "User registered" });
  }

  const hash = await bcrypt.hash(password, 10);
  users.set(email, hash);

  return response.status(201).send({ message: "User registered" });
}

export async function login(request: any, response: any) {
  const { email, password } = request.body;
  const hash = users.get(email);

  if (!hash && hash != undefined && !(await bcrypt.compare(password, hash))) {
    return response.status(401).send({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return response.send({ token });
}
