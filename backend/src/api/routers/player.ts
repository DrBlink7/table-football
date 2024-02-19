import { Logger } from "../../logger";
import { asyncErrWrapper, formatError } from "../errorHandling";
import { decodeToken } from "./utils";
import { dbFactory } from "../../db";
import { RepositoryType } from "../../config";
import express from "express";

export const playerRouter = express.Router();

/**
 * @swagger
 * /api/player:
 *   get:
 *     summary: Recupera la lista di Players.
 *     responses:
 *       200:
 *         description: Restituisce i Players.
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetPlayersError'
 *     tags:
 *       - Players
 *     security:
 *       - Authorization: []
 */
playerRouter.get(
  "/",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const getPlayersTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.getPlayers()
      const fetchTime = Math.round(performance.now() - getPlayersTimestamp)
      Logger.writeEvent(`Players: fetch tag in ${fetchTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "003-RESPONSE",
        "playerRouter players get"
      )

      return res.status(status).json(error)
    }
  })
)
