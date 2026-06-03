import { Router } from "express";

import {
  listarMedicos,
  buscarMedicoPorId,
  criarMedico,
  atualizarMedico,
  deletarMedico,
} from "../controllers/medicoController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Gerenciamento de médicos
 */

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Lista todos os médicos
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get("/", listarMedicos);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Busca médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico não encontrado
 */
router.get("/:id", buscarMedicoPorId);

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Cria um médico
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               crm:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               valorConsulta:
 *                 type: number
 *               especialidadeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Médico criado com sucesso
 */
router.post("/", criarMedico);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Atualiza um médico
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               crm:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               valorConsulta:
 *                 type: number
 *               especialidadeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 */
router.put("/:id", atualizarMedico);

/**
 * @swagger
 * /medicos/{id}:
 *   delete:
 *     summary: Deleta um médico
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico deletado com sucesso
 */
router.delete("/:id", deletarMedico);

export default router;