import createToken from "../services/createToken.js"
import {Router} from "express"

const router = Router()

router.post("/",(req, res)=>{
    const data = req.body

    let token = createToken(data)
    return res.status(200).send(token)
})

export default router