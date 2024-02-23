import { Logger } from "../../logger";
import { asyncErrWrapper, formatError } from "../errorHandling";
import { decodeToken } from "./utils";
import { dbFactory } from "../../db";
import { RepositoryType } from "../../config";
import express from "express";

export const matchesRouter = express.Router();

/**
 * @swagger
 * /api/match:
 *   get:
 *     summary: Recupera la lista dei Matches.
 *     responses:
 *       200:
 *         description: Restituisce i Matches.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GetMatchesDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMatchesError'
 *     tags:
 *       - Matches
 *     security:
 *       - Authorization: []
 */
matchesRouter.get(
  "/",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const getMatchesTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.getMatches()
      const fetchTime = Math.round(performance.now() - getMatchesTimestamp)
      Logger.writeEvent(`Matches: fetched matches in ${fetchTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "011-RESPONSE",
        "matchesRouter matches get"
      )

      return res.status(status).json(error)
    }
  })
)
