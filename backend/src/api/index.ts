import express, { Request, Response } from "express";
import { ServerPort } from "../config";
import { loginRouter } from "./routers/login";
import { playerRouter } from "./routers/player";
import { teamRouter } from "./routers/team";

export const apiRouter = express.Router();

/**
 * @swagger
 * /api/healthcheck:
 *  get:
 *    summary: Restituisce un messaggio di saluto
 *    responses:
 *      200:
 *        message: I'm alive and answering on port XXXX
 *    tags:
 *      - Healthcheck
 *
 *  @swagger
 * components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 * 
 */
apiRouter.get("/healthcheck", (_req: Request, res: Response) =>
  res.json({ message: `I'm alive and answering on port ${ServerPort}` })
);

apiRouter.use("/login", loginRouter)
apiRouter.use("/player", playerRouter)
apiRouter.use("/team", teamRouter)