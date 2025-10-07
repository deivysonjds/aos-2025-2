import { Router } from "express";
import jsonwebtoken from "jsonwebtoken"
import models from "../models";

const router = Router()

router.post("/signup", (req, res)=>{
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).send("Email ou senha nulos!")
    }

    

})

export default router