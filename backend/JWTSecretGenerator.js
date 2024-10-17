const crypto = require("crypto");

function generateJWTSecret(length = 32) {
  return crypto.randomBytes(length).toString("hex");
}

const jwtSecret = generateJWTSecret();
console.log(`JWT Secret: ${jwtSecret}`);
