import express, { NextFunction, Request, Response } from "express"
import { RepositoryType, clients } from "../../config"
import { asyncErrWrapper, formatError } from "../errorHandling"
import { formatSSEMessage, isEmpty } from "./utils"
import { BroadcastType, NotifyBroadcast, endMatchBODY, startMatchBODY } from "./types"
import { dbFactory } from "../../db"

export const notificationRouter = express.Router()

const sseBroadcast = (req: Request, _res: Response, next: NextFunction) => {
  const body: BroadcastType = req.body
  const data = formatSSEMessage(body)
  if (!isEmpty(data)) {
    clients.forEach(userConnection =>
      sendEventStreamData(data, userConnection)
    )
  }

  next()
}

/**
 * @swagger
 * /api/notification/addgoal:
 *   post:
 *     summary: Manda una notifica
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            oneOf:
 *              - $ref: '#/components/schemas/NotifyBroadcast'
 *     responses:
 *       204:
 *         description: Notification inviata con successo
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Notification
 */
notificationRouter.post(
  "/addgoal",
  sseBroadcast,
  asyncErrWrapper(async (req, res) => {
    try {
      const body: NotifyBroadcast = req.body
      const { teamid, matchid } = body
      const db = dbFactory(RepositoryType)
      await db.addGoal(matchid, teamid)

      return res.status(204).json()
    } catch (err) {
      const { status, error } = formatError(err)
      return res.status(status).json(error)
    }
  })
)

const sendEventStreamData = (data: any, res: Response) => {
  const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`
  res.write(sseFormattedResponse)
  res.flush()
}

/**
 * @swagger
 * /api/notification/startmatch:
 *   post:
 *     summary: Fa partire un Match
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/startMatchBODY'
 *     responses:
 *       204:
 *         description: Notification inviata con successo
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Notification
 */
notificationRouter.post(
  "/startmatch",
  asyncErrWrapper(async (req, res) => {
    try {
      const body: startMatchBODY = req.body
      const { matchid } = body
      const db = dbFactory(RepositoryType)
      await db.startMatch(matchid)

      return res.status(204).json()
    } catch (err) {
      const { status, error } = formatError(err)
      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/notification/endmatch:
 *   post:
 *     summary: Fa terminare un Match
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/endMatchBODY'
 *     responses:
 *       204:
 *         description: Notification inviata con successo
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Notification
 */
notificationRouter.post(
  "/endmatch",
  asyncErrWrapper(async (req, res) => {
    try {
      const body: endMatchBODY = req.body
      const { matchid } = body
      const db = dbFactory(RepositoryType)
      await db.endMatch(matchid)

      return res.status(204).json()
    } catch (err) {
      const { status, error } = formatError(err)
      return res.status(status).json(error)
    }
  })
)