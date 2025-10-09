import { Router } from "express";
import models from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {

    let { userId } = req.query

    let tasks = await models.Tasks.findAll()
    return res.status(200).send(tasks);
});

router.get("/:taskId", async (req, res) => {
    let id = req.params.taskId

    let task = await models.Tasks.findOne({
        where: {
            id: id
        }
    })

    if (task == null) return res.status(404).send("Mensagem não encontrada")

    return res.status(200).send(task)
});

router.post("/", async (req, res) => {
    let { userId } = req.query

    let task = await models.Tasks.create({
        descricao: req.body.descricao,
        concluida: req.body.concluida,
        userId: userId || 1,
    })

    return res.status(201).send(task);
});

router.delete("/:taskId", async (req, res) => {
    let id = req.params.taskId

    await models.Tasks.destroy({
        where: {
            id: id
        }
    })

    return res.status(204).send();
});

router.put("/:taskId", async (req, res) => {
    let id = req.params.taskId

    let task = await models.Tasks.findOne({
        where: {
            id: id
        }
    })

    if (task == null) return res.status(404).send()
        
    if(req.body.descricao != null) task.set({descricao: req.body.descricao})
    if(req.body.concluida != null) task.set({descricao: req.body.concluida})

    await task.save()

    return res.status(200).send(task)
});

export default router;
