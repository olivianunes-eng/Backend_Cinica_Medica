import { Router } from "express";

import {
  listarEspecialidades,
  buscarEspecialidadePorId,
  criarEspecialidade,
  atualizarEspecialidade,
  deletarEspecialidade,
} from "../controllers/especialidadeController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: Gerenciamento de especialidades médicas
 */

/**
 * @swagger
 * /especialidades:
 *   get:
 *     summary: Lista todas as especialidades
 *     tags: [Especialidades]
 *     responses:
 *       200:
 *         description: Lista de especialidades
 */
router.get("/", listarEspecialidades);

/**
 * @swagger
 * /especialidades/{id}:
 *   get:
 *     summary: Busca especialidade por ID
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidade encontrada
 *       404:
 *         description: Especialidade não encontrada
 */
router.get("/:id", buscarEspecialidadePorId);

/**
 * @swagger
 * /especialidades:
 *   post:
 *     summary: Cria uma especialidade
 *     tags: [Especialidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Especialidade criada com sucesso
 */
router.post("/", criarEspecialidade);

/**
 * @swagger
 * /especialidades/{id}:
 *   put:
 *     summary: Atualiza uma especialidade
 *     tags: [Especialidades]
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
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Especialidade atualizada com sucesso
 */
router.put("/:id", atualizarEspecialidade);

/**
 * @swagger
 * /especialidades/{id}:
 *   delete:
 *     summary: Deleta uma especialidade
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidade deletada com sucesso
 */
router.delete("/:id", deletarEspecialidade);

export default router;