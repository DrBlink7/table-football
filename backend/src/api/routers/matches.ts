import { Logger } from "../../logger";
import { asyncErrWrapper, formatError } from "../errorHandling";
import { decodeToken, missingInBody } from "./utils";
import { dbFactory } from "../../db";
import { RepositoryType } from "../../config";
import { CreateMatchBODY, EditMatchBODY } from "./types";
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

/**
 * @swagger
 * /api/match:
 *   post:
 *     summary: Inserisce un nuovo Match.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMatchBODY'
 *     responses:
 *       200:
 *         description: Restituisce il Match appena creato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CreateMatchDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CreateMatchError'
 *     tags:
 *       - Matches
 *     security:
 *       - Authorization: []
 */
matchesRouter.post(
  "/",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)
      const body: CreateMatchBODY = req.body
      const { red, blue } = body

      if (missingInBody(red)) throw new Error("red is missing in body")
      if (missingInBody(blue)) throw new Error("blue is missing in body")

      const createMatchTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.createMatch(red, blue)
      const createTime = Math.round(performance.now() - createMatchTimestamp)
      Logger.writeEvent(`Matches: created match in ${createTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "012-RESPONSE",
        "matchesRouter match post"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/match/{id}:
 *   put:
 *     summary: Modifica il Match.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Match da modificare.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditMatchBODY'
 *     responses:
 *       200:
 *         description: Restituisce il match appena modificato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/EditMatchDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/EditMatchError'
 *     tags:
 *       - Matches
 *     security:
 *       - Authorization: []
 */
matchesRouter.put(
  "/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      const { id } = req.params

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)
      const body: EditMatchBODY = req.body
      const { blue, red } = body

      if (missingInBody(blue)) throw new Error("blue is missing in body")
      if (missingInBody(red)) throw new Error("red is missing in body")

      const editMatchTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.editMatch(id, blue!, red!)
      const editTime = Math.round(performance.now() - editMatchTimestamp)
      Logger.writeEvent(`Matches: edited match in ${editTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "013-RESPONSE",
        "matchesRouter match put id"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/match/{id}:
 *   delete:
 *     summary: Elimina il Match.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Match da cancellare.
 *     responses:
 *       200:
 *         description: Restituisce l'id del match appena cancellato.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeleteMatchDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeleteMatchError'
 *     tags:
 *       - Matches
 *     security:
 *       - Authorization: []
 */
matchesRouter.delete(
  "/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      const { id } = req.params

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const deleteMatchTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.deleteMatch(id)
      const deleteTime = Math.round(performance.now() - deleteMatchTimestamp)
      Logger.writeEvent(`Matches: delete match in ${deleteTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "014-RESPONSE",
        "matchesRouter match delete id"
      )

      return res.status(status).json(error)
    }
  })
)

/**
 * @swagger
 * /api/match/{id}:
 *   get:
 *     summary: Recupera il Match.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'id del Match da recuperare.
 *     responses:
 *       200:
 *         description: Restituisce il Match.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GetMatchDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMatchError'
 *     tags:
 *       - Matches
 *     security:
 *       - Authorization: []
 */
matchesRouter.get(
  "/:id",
  asyncErrWrapper(async (req, res) => {
    try {
      const token = req.headers["authorization"]
      const { id } = req.params

      if (!token) throw new Error("token is missing in headers")

      decodeToken(token)

      const getMatchTimestamp = performance.now()
      const db = dbFactory(RepositoryType)
      const data = await db.getMatch(id)
      const fetchTime = Math.round(performance.now() - getMatchTimestamp)
      Logger.writeEvent(`Matches: fetched match in ${fetchTime} ms`)

      return res.status(200).json(data)
    } catch (e) {
      const { status, error } = formatError(
        e as Error,
        "018-RESPONSE",
        "matchesRouter match get id"
      )

      return res.status(status).json(error)
    }
  })
)