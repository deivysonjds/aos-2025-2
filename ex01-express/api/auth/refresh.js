import models from "../models/index.js";
import createToken from "../services/createToken.js";
import { Router } from "express";
import argon2d from "argon2";
import jwt from "jsonwebtoken";  // Importando o JWT

const router = Router();

router.post("/refresh", async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'não autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_REFRESH); 
        const dados = decoded.id;  

        const token_acess = jwt.sign(dados, process.env.SECRET_ACESS, { expiresIn: process.env.SECRET_ACESS_EXPIRES }); 

        return res.status(200).json({ acess: token_acess });
    } catch (err) {
        return res.status(403).json({ error: 'não autorizado' });
    }
});

export default router;
