import models from "../models/index.js"
import createToken from "../services/createToken.js"
import {Router} from "express"
import argon2d from "argon2"

const router = Router()

router.post("/", async (req, res)=>{
    const {email, senha} = req.body

    let user = await models.User.findByLogin(email)

    if(!user){
        return res.status(404).send({error: "credenciais inválidas"})
    }

    let isValid = argon2d.verify(user.senha, senha)

    if(!isValid) return res.status(401).send({error: "credenciais inválidas"})

    let token = createToken({id: user.id, email: user.email})

    return res.status(200).send({token})
})

export default router