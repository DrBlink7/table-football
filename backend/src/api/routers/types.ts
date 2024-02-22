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
  striker?: number
  defender?: number
}
export interface EditTeamDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
}
export interface DeleteTeamDTO {
  id: number
}