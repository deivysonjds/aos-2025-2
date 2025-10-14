import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";
import auth from "./auth/index.js"

import authMiddleware from "./middleware/authMiddleware.js";
import argon2d from "argon2";

const app = express();
app.set("trust proxy", true);

var corsOptions = {
  origin: ["http://example.com", "*"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Código para conseguir extrair o conteúdo do body da mensagem HTTP
// e armazenar na propriedade req.body (utiliza o body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.root);
app.use("/", auth);
app.use("/tasks", routes.tasks)
app.use("/users",authMiddleware, routes.user);
app.use("/messages",authMiddleware, routes.message);

const port = process.env.PORT ?? 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === "true";

sequelize.sync({force: eraseDatabaseOnSync}).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port} !`);
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      senha: await argon2.hash(senha, {
        type: argon2id,
        secret: Buffer.from(process.env.PEPPER_SECRET)
      }),
      messages: [
        {
          text: "Published the Road to learn React",
        },
        {
          text: "Published also the Road to learn Express + PostgreSQL",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      senha: await argon2.hash(senha, {
        type: argon2id,
        secret: Buffer.from(process.env.PEPPER_SECRET)
      }),
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};

export default app;
