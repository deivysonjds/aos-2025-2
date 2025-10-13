import { Router } from "express";
import jwt from "jsonwebtoken"; 
import models from "../models/index.js";

const router = Router();

router.post("/logout", async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'não autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_REFRESH); 
        const id = decoded.id;  

        await models.Token.destroy({
            where: {
                tokenId: id
            }
        }) 

        return res.status(200).json({ acess: token_acess });
    } catch (err) {
        return res.status(403).json({ error: 'não autorizado' });
    }
});

export default router;
