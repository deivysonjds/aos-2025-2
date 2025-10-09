import { Router } from "express";
import jsonwebtoken from "jsonwebtoken"
import models from "../models";

const router = Router()

router.post("/", async (req, res)=>{
    const {email, senha, username} = req.body
    if (!email || !senha) {
        return res.status(400).send("Email ou senha nulos!")
    }
    let user = {
        email: email,
        senha: senha,
        username: username
    }
    
    let newUser = await models.User.create(user)

    return res.status(201).send(newUser);
})

export default router