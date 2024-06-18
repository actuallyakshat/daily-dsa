import crypto from "crypto";

// Generate a random JWT secret (32 bytes)
const jwtSecret = crypto.randomBytes(32).toString("hex");

console.log(jwtSecret);
