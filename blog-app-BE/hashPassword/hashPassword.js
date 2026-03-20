const bcrypt = require("bcrypt");
const saltRounds = 10;


async function hashPasswordFtn(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hash(password, salt);
}


async function comparePassword(plain, hashedPassword) {
  return bcrypt.compareSync(plain, hashedPassword);
}


module.exports = {hashPasswordFtn, comparePassword}