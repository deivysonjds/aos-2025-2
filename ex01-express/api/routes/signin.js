import createToken from "../services/createToken"
import {Router} from "express"

const router = Router()

router.post("/signIn",(req, res)=>{
    const data = req.body

    let token = createToken(data)
    return res.status(200).send(token)
})

export default router