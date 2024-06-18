"use server";
import bcrypt from "bcrypt";
import prisma from "@/db";
import jwt from "jsonwebtoken";
export async function register(username: string, password: string) {
  try {
    if (!username || !password) {
      return { success: false, message: "Username and password are required" };
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return { success: true, user: newUser, message: "User created" };
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export async function login(username: string, password: string) {
  try {
    if (!username || !password) {
      return { success: false, message: "Username and password are required" };
    }
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return { success: false, message: "User does not exists" };
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, message: "Invalid password" };
    }
    const payload = { username };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "14d",
    });
    return { success: true, user: user, token: token, message: "Logged in" };
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export async function verify(token: string) {
  try {
    const decoded: { username: string } = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as any;
    if (decoded) {
      const user = await prisma.user.findUnique({
        where: {
          username: decoded.username,
        },
      });
      if (user) {
        return { success: true, user: user, message: "Verified" };
      } else {
        return { success: false, message: "Invalid token" };
      }
    } else {
      return { success: false, message: "Invalid token" };
    }
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}
