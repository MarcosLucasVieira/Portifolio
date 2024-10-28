import express from "express";
import pacientesController from "../controllers/pacientesController.js";

const routes = express.Router();

routes.get("/pacientes", pacientesController.listarPacientes);
routes.get("/pacientes/:id", pacientesController.listaPacientePorId);
routes.post("/pacientes", pacientesController.cadastrarPacientes);
routes.post("/pacientes/:id", pacientesController.atualizaPaciente);
routes.delete("/pacientes/:id", pacientesController.deletarPaciente);

export default routes;