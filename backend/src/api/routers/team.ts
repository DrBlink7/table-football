import { Logger } from "../../logger";
import { asyncErrWrapper, formatError } from "../errorHandling";
import { decodeToken, missingInBody } from "./utils";
import { dbFactory } from "../../db";
import { RepositoryType } from "../../config";
import { CreateTeamBODY, EditTeamBODY } from "./types";
import express from "express";

export const teamRouter = express.Router();

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Recupera la lista dei Team.
 *     responses:
 *       200:
 *         description: Restituisce i Team.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GetTeamsDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTeamsError'
 *     tags:
 *       - Teams
 *     security:
 *       - Authorization: []
 */
teamRouter.get(
  "/",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const getTeamsTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.getTeams()
      const fetchTime = Math.round(performance.now() - getTeamsTimestamp)
      Logger.writeEvent(`Teams: fetched teams in ${fetchTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "007-RESPONSE",
        "teamRouter teams get"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/team:
 *   post:
 *     summary: Inserisce un nuovo Team.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeamBODY'
 *     responses:
 *       200:
 *         description: Restituisce il team appena modificato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CreateTeamDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CreateTeamError'
 *     tags:
 *       - Teams
 *     security:
 *       - Authorization: []
 */
teamRouter.post(
  "/",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)
      const body: CreateTeamBODY = req.body
      const { striker, defender, name } = body

      if (missingInBody(striker)) throw new Error("striker is missing in body")
      if (missingInBody(defender)) throw new Error("defender is missing in body")
      if (missingInBody(name)) throw new Error("name is missing in body")

      const createTeamTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.createTeam(striker, defender, name)
      const createTime = Math.round(performance.now() - createTeamTimestamp)
      Logger.writeEvent(`Teams: created team in ${createTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "008-RESPONSE",
        "teamRouter team post"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/team/{id}:
 *   put:
 *     summary: Modifica il Team.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Team da modificare.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditTeamBODY'
 *     responses:
 *       200:
 *         description: Restituisce il team appena modificato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/EditTeamDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/EditTeamError'
 *     tags:
 *       - Teams
 *     security:
 *       - Authorization: []
 */
teamRouter.put(
  "/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      const { id } = req.params

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)
      const body: EditTeamBODY = req.body
      const { striker, defender, name } = body

      if (missingInBody(striker)) throw new Error("striker is missing in body")
      if (missingInBody(defender)) throw new Error("defender is missing in body")
      if (missingInBody(name)) throw new Error("name is missing in body")

      const editTeamTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.editTeam(id, striker, defender, name)
      const editTime = Math.round(performance.now() - editTeamTimestamp)
      Logger.writeEvent(`Teams: edited team in ${editTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "009-RESPONSE",
        "teamRouter teams put id"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/team/{id}:
 *   delete:
 *     summary: Elimina il Team.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Team da cancellare.
 *     responses:
 *       200:
 *         description: Restituisce l'id del team appena cancellato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeleteTeamDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeleteTeamError'
 *     tags:
 *       - Teams
 *     security:
 *       - Authorization: []
 */
teamRouter.delete(
  "/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      const { id } = req.params

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const deleteTeamTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.deleteTeam(id)
      const deleteTime = Math.round(performance.now() - deleteTeamTimestamp)
      Logger.writeEvent(`Teams: delete team in ${deleteTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "010-RESPONSE",
        "teamRouter team delete id"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/team/stats/{id}:
 *   get:
 *     summary: Recupera le statistiche del Team.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Team.
 *     responses:
 *       200:
 *         description: Restituisce le statistiche del Team.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GetTeamStatDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTeamError'
 *     tags:
 *       - Teams
 *     security:
 *       - Authorization: []
 */
teamRouter.get(
  "/stats/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const { id } = req.params
      const token = req.headers["authorization"]
      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const getTeamTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.getTeamStat(id)
      const fetchTime = Math.round(performance.now() - getTeamTimestamp)
      Logger.writeEvent(`Teams: fetched team stats in ${fetchTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "020-RESPONSE",
        "teamRouter team stats get"
      )

      return res.status(status).json(error)
    }
  })
)