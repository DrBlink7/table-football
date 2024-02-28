import { Logger } from "../../logger";
import { asyncErrWrapper, formatError } from "../errorHandling";
import { decodeToken, missingInBody } from "./utils";
import { dbFactory } from "../../db";
import { RepositoryType } from "../../config";
import { CreatePlayerBODY, EditPlayerBODY } from "./types";
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
 *              $ref: '#/components/schemas/GetPlayersDTO'
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
      Logger.writeEvent(`Players: fetched players in ${fetchTime} ms`)

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

/**
 * @swagger
 * /api/player:
 *   post:
 *     summary: Inserisce un nuovo Player.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePlayerBODY'
 *     responses:
 *       200:
 *         description: Restituisce il player appena modificato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CreatePlayerDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CreatePlayerError'
 *     tags:
 *       - Players
 *     security:
 *       - Authorization: []
 */
playerRouter.post(
  "/",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)
      const body: CreatePlayerBODY = req.body
      const { name } = body

      if (missingInBody(name)) throw new Error("name is missing in body")

      const createPlayerTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.createPlayer(name)
      const createTime = Math.round(performance.now() - createPlayerTimestamp)
      Logger.writeEvent(`Players: created player in ${createTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "004-RESPONSE",
        "playerRouter players post"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/player/{id}:
 *   put:
 *     summary: Modifica il Player.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Player da modificare.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditPlayerBODY'
 *     responses:
 *       200:
 *         description: Restituisce il player appena modificato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/EditPlayerDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/EditPlayerError'
 *     tags:
 *       - Players
 *     security:
 *       - Authorization: []
 */
playerRouter.put(
  "/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      const { id } = req.params

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)
      const body: EditPlayerBODY = req.body
      const { name } = body

      if (missingInBody(name)) throw new Error("name is missing in body")

      const editPlayerTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.editPlayer(id, name)
      const editTime = Math.round(performance.now() - editPlayerTimestamp)
      Logger.writeEvent(`Players: edited player in ${editTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "005-RESPONSE",
        "playerRouter players put id"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/player/{id}:
 *   delete:
 *     summary: Elimina il Player.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Player da cancellare.
 *     responses:
 *       200:
 *         description: Restituisce l'id del player appena cancellato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeletePlayerDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeletePlayerError'
 *     tags:
 *       - Players
 *     security:
 *       - Authorization: []
 */
playerRouter.delete(
  "/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      const { id } = req.params

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const deletePlayerTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.deletePlayer(id)
      const deleteTime = Math.round(performance.now() - deletePlayerTimestamp)
      Logger.writeEvent(`Players: delete player in ${deleteTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "006-RESPONSE",
        "playerRouter players delete id"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/player/stats/{id}:
 *   get:
 *     summary: Recupera le statistiche del Player.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Player.
 *     responses:
 *       200:
 *         description: Restituisce le statistiche del Player.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GetPlayerStatDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetPlayerError'
 *     tags:
 *       - Players
 *     security:
 *       - Authorization: []
 */
playerRouter.get(
  "/stats/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const { id } = req.params
      const token = req.headers["authorization"]
      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const getPlayerTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.getPlayerStat(id)
      const fetchTime = Math.round(performance.now() - getPlayerTimestamp)
      Logger.writeEvent(`Players: fetched player stats in ${fetchTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "019-RESPONSE",
        "playerRouter player stats get"
      )

      return res.status(status).json(error)
    }
  })
)