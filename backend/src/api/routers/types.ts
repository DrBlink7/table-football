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
 *            striker:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *            defender:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
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
 *      GetRankingsDTO:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            goalsScored:
 *              type: number
 *            gamesPlayed:
 *              type: number
 *            goalsConceded:
 *              type: number
 *            points:
 *              type: number
 *            striker:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *            defender:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *      GetDefenderStatsDTO:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *            gamesPlayed:
 *              type: number
 *            goalsConceded:
 *              type: number
 *            goalsConcededPerMatch:
 *              type: number
 *      GetStrikerStatsDTO:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *            gamesPlayed:
 *              type: number
 *            goalsScoredPerMatch:
 *              type: number
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

export interface GetRankingsDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
  points: number
  goalsScored: number
  goalsConceded: number
  gamesPlayed: number
}

export interface GetDefenderStatsDTO {
  id: number
  name: string
  goalsConceded: number
  goalsConcededPerMatch: number
  gamesPlayed: number
}
export interface GetStrikerStatsDTO {
  id: number
  name: string
  goalsScored: number
  goalsScoredPerMatch: number
  gamesPlayed: number
}

/**
 * @swagger
 * components:
 *   schemas:
 *     NotifyBroadcast:
 *       properties:
 *         teamId:
 *           type: string
 *           example: 1
 *         matchId:
 *           type: string
 *           example: 2
 *         type:
 *           type: string
 *           enum:
 *             - goalScored
 *         text:
 *           type: string
 *           example: What a Great Goal
 *       required:
 *         - teamId
 *         - matchId
 *         - type
 *         - text
 */
enum MessageType {
  "goalScored" = "goalScored"
}
type MessageTypeMap = {
  notify: NotifyBroadcast
}
export type BroadcastType = MessageTypeMap[keyof MessageTypeMap]
type Broadcast = {
  matchId: string;
  type: keyof typeof MessageType;
}
type NotifyBroadcast = Broadcast & NotifyMessage
type NotifyMessage = {
  type: "goalScored"
  text: string
  teamId: string
}
export type SSEMessage = NotifyMessage
