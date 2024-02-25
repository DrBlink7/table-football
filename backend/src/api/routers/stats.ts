import express from "express";
import { asyncErrWrapper, formatError } from "../errorHandling";
import { decodeToken } from "./utils";
import { RepositoryType } from "../../config";
import { dbFactory } from "../../db";
import { Logger } from "../../logger";

export const statsRouter = express.Router();

/**
 * @swagger
 * /api/stats/rankings:
 *   get:
 *     summary: Recupera la classifica dei team.
 *     responses:
 *       200:
 *         description: Restituisce la classifica.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GetRankingsDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRankingsError'
 *     tags:
 *       - Stats
 *     security:
 *       - Authorization: []
 */
statsRouter.get(
  "/rankings",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const getRankingsTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.getRankings()
      const fetchTime = Math.round(performance.now() - getRankingsTimestamp)
      Logger.writeEvent(`Stats: fetched rankings in ${fetchTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "015-RESPONSE",
        "statsRouter rankings get"
      )

      return res.status(status).json(error)
    }
  })
)
