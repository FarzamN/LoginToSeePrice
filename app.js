import cors from "cors";
import chalk from "chalk";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import { DBConnection } from "./src/configuration/config.js";

import { authRoute } from "./src/routes/index.js";

config();
DBConnection();

const app = express();

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
const port = process.env.PORT || 10800;

app.use("/auth", authRoute);
app.get("/", (_, res) => res.send("𝐋𝐨𝐠𝐢𝐧 𝐓𝐨 𝐒𝐞𝐞 𝐏𝐫𝐢𝐜𝐞!"));

app.listen(port, () =>
  console.log(
    chalk.hex("#76ABAE")("𝓛𝓸𝓰𝓲𝓷 𝓣𝓸 𝓢𝓮𝓮 𝓟𝓻𝓲𝓬𝓮", `http://localhost:${port}/`)
  )
);
