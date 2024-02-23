import { MatchStatus } from "../../db/postgreDb/types"

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetPlayersDTO:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *      CreatePlayerBODY:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *      CreatePlayerDTO:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *      EditPlayerBODY:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *      EditPlayerDTO:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *      DeletePlayerDTO:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *      GetTeamsDTO:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *      CreateTeamBODY:
 *        type: object
 *        properties:
 *          striker:
 *            type: string
 *          defender:
 *            type: string
 *      CreateTeamDTO:
 *        type: object
 *        properties:
 *          striker:
 *            type: string
 *          defender:
 *            type: string
 *          id:
 *            type: number
 *      EditTeamBODY:
 *        type: object
 *        properties:
 *          striker:
 *            type: string
 *          defender:
 *            type: string
 *        required:
 *          - id
 *      EditTeamDTO:
 *        type: object
 *        properties:
 *          striker:
 *            type: string
 *          defender:
 *            type: string
 *          id:
 *            type: number
 *      DeleteTeamDTO:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *      GetMatchesDTO:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            blue:
 *              $ref: '#/components/schemas/Team'
 *            red:
 *              $ref: '#/components/schemas/Team'
 *            status:
 *              type: string
 *              enum:
 *                - preparing
 *                - ongoing
 *                - ended
 *      Team:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          score:
 *            type: number
 *          striker:
 *            type: string
 *          defender:
 *            type: string
 *      CreateMatchBODY:
 *        type: object
 *        properties:
 *          red:
 *            type: number
 *          blue:
 *            type: number
 *      CreateMatchDTO:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            blue:
 *              $ref: '#/components/schemas/Team'
 *            red:
 *              $ref: '#/components/schemas/Team'
 *            status:
 *              type: string
 *              enum:
 *                - preparing
 *                - ongoing
 *                - ended
 *      EditMatchBODY:
 *        type: object
 *        properties:
 *          red:
 *            type: number
 *          blue:
 *            type: number
 *      EditMatchDTO:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            blue:
 *              $ref: '#/components/schemas/Team'
 *            red:
 *              $ref: '#/components/schemas/Team'
 *            status:
 *              type: string
 *              enum:
 *                - preparing
 *                - ongoing
 *                - ended
 *      DeleteMatchDTO:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 */
export type GetPlayersDTO = {
  name: string
  id: number
}[]
export interface CreatePlayerBODY {
  name: string
}
export interface CreatePlayerDTO {
  name: string
  id: number
}
export interface EditPlayerBODY {
  name: string
}
export interface EditPlayerDTO {
  name: string
  id: number
}
export interface DeletePlayerDTO {
  id: number
}
export type PlayerInfo = {
  name: string
}
export type GetTeamsDTO = {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
}[]
export type CreateTeamBODY = {
  striker: number
  defender: number
}
export type CreateTeamDTO = {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
}
export type EditTeamBODY = {
  striker: number
  defender: number
}
export interface EditTeamDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
}
export interface DeleteTeamDTO {
  id: number
}
export type TeamInfo = {
  playerIds: number[]
  striker: string
  defender: string
}
export type GetMatchesDTO = {
  blue: { id: number, striker: string, defender: string, score: number }
  red: { id: number, striker: string, defender: string, score: number }
  id: number
  status: MatchStatus
}[]
export type CreateMatchBODY = {
  blue: number
  red: number
}
export type CreateMatchDTO = {
  blue: { id: number, striker: string, defender: string, score: number }
  red: { id: number, striker: string, defender: string, score: number }
  id: number
  status: MatchStatus
}
export type EditMatchBODY = {
  blue: number
  red: number
}
export type EditMatchDTO = {
  blue: { id: number, striker: string, defender: string, score: number }
  red: { id: number, striker: string, defender: string, score: number }
  id: number
  status: MatchStatus
}
export interface DeleteMatchDTO {
  id: number
}
