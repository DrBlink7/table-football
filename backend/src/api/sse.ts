import { NextFunction, Request, Response } from "express"
import { CorsHost, clients } from "../config"

export const sseHandler = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", CorsHost)
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.status(204).end()
    return
  }

  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")

  if (CorsHost) {
    res.setHeader("Access-Control-Allow-Origin", CorsHost)
  }

  res.flushHeaders()

  const userId = req.query.userid
  if (typeof userId !== 'string') throw new Error('userid must be a string')

  clients.set(userId, res)

  res.on("close", () => {
    const userConnection = clients.get(userId)
    if (userConnection) {
      clients.delete(userId)
      userConnection?.end()
    }
  })

  res.on("finish", () => {
    const userConnection = clients.get(userId)
    if (userConnection) {
      clients.delete(userId)
      userConnection?.end()
    }
  })

  next()
}
