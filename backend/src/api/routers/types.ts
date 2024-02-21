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