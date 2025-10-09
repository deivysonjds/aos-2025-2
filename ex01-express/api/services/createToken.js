import "dotenv/config";

export default function createToken(dados) {
  const SECRET = process.env.JWT_SECRET;
  const EXPIRES = process.env.JWT_EXPIRES;

  return jwt.sign(dados, SECRET, { expiresIn: EXPIRES });
}