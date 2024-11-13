const crypto = require("crypto");

const tokenBuffer = crypto.randomBytes(32);

const token = tokenBuffer.toString("hex");

console.log(`Token: ${token}`);
