import "dotenv/config";
import {v4} from "uuid"

export default function createToken(dados) {

  const token_acess = jwt.sign(dados, SECRET_ACESS, { expiresIn: SECRET_ACESS_EXPIRES });
  const token_refresh = jwt.sign({id: v4()}, SECRET_REFRESH, { expiresIn: SECRET_REFRESH_EXPIRES });

  return {refresh: token_refresh, acess: token_acess}
}