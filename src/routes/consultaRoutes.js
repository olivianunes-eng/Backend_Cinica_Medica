import { Router } from "express";

import {
  listarConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta,
  realizarConsulta,
  cancelarConsulta,
} from "../controllers/consultaController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: Gerenciamento de consultas
 */

/**
 * @swagger
 * /consultas:
 *   get:
 *     summary: Lista todas as consultas
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de consultas
 */
router.get("/", listarConsultas);

/**
 * @swagger
 * /consultas/{id}:
 *   get:
 *     summary: Busca consulta por ID
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *       404:
 *         description: Consulta não encontrada
 */
router.get("/:id", buscarConsultaPorId);

/**
 * @swagger
 * /consultas:
 *   post:
 *     summary: Cria uma consulta
 *     tags: [Consultas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dataConsulta:
 *                 type: string
 *               observacao:
 *                 type: string
 *               status:
 *                 type: string
 *               valor:
 *                 type: number
 *               pacienteId:
 *                 type: integer
 *               medicoId:
 *                 type: integer
 *               usuarioId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 */
router.post("/", criarConsulta);

/**
 * @swagger
 * /consultas/{id}/realizar:
 *   put:
 *     summary: Marca uma consulta como realizada
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta realizada com sucesso
 *       400:
 *         description: Não é possível realizar consulta cancelada ou já realizada
 *       404:
 *         description: Consulta não encontrada
 */
router.put("/:id/realizar", realizarConsulta);

/**
 * @swagger
 * /consultas/{id}/cancelar:
 *   put:
 *     summary: Cancela uma consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta cancelada com sucesso
 *       400:
 *         description: Não é possível cancelar consulta realizada ou já cancelada
 *       404:
 *         description: Consulta não encontrada
 */
router.put("/:id/cancelar", cancelarConsulta);

/**
 * @swagger
 * /consultas/{id}:
 *   put:
 *     summary: Atualiza uma consulta
 *     tags: [Consultas]
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
 *               dataConsulta:
 *                 type: string
 *               observacao:
 *                 type: string
 *               status:
 *                 type: string
 *               valor:
 *                 type: number
 *               pacienteId:
 *                 type: integer
 *               medicoId:
 *                 type: integer
 *               usuarioId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 */
router.put("/:id", atualizarConsulta);

/**
 * @swagger
 * /consultas/{id}:
 *   delete:
 *     summary: Deleta uma consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta deletada com sucesso
 */
router.delete("/:id", deletarConsulta);

export default router;