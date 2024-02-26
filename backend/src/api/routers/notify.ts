import express, { NextFunction, Request, Response } from "express"
import { clients } from "../../config"
import { asyncErrWrapper, formatError } from "../errorHandling"
import { formatSSEMessage, isEmpty } from "./utils"
import { BroadcastType } from "./types"

export const notificationRouter = express.Router()

const sseBroadcast = (req: Request, _res: Response, next: NextFunction) => {
  const body: BroadcastType = req.body
  const matchId = body.matchId
  const data = formatSSEMessage(body)
  if (!isEmpty(data)) {
    const userConnection = clients.get(matchId)
    if (userConnection) {
      sendEventStreamData(data, userConnection)
    }
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
  asyncErrWrapper(async (_req, res) => {
    try {
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
