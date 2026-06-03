import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pacienteRoutes from "./src/routes/pacienteRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import especialidadeRoutes from "./src/routes/especialidadeRoutes.js";
import medicoRoutes from "./src/routes/medicoRoutes.js";
import consultaRoutes from "./src/routes/consultaRoutes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Clínica Médica funcionando");
});

app.use("/pacientes", pacienteRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/especialidades", especialidadeRoutes);
app.use("/medicos", medicoRoutes);
app.use("/consultas", consultaRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});