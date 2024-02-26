import { BroadcastType, SSEMessage } from "./types";

/**
 * With decodeToken we will check and validate token evenutally extracting the user_id
 * @param token bearer token sent by FE user
 * @returns user_id of the bearer
 */
export const decodeToken = (token: string): string => token.split(" ")[1]
/**
 * Checks if element is missing in body
 * @param el any Body element that you want to check its nullish or undefined values
 * @returns true if el is null or undefined, false otherwise
 */
export const missingInBody = (el: unknown): boolean => el === undefined || el === null

export const formatSSEMessage = (body: BroadcastType): SSEMessage | null => {
  switch (body.type) {
    case "goalScored":
      if (body.text)
        return {
          type: body.type,
          text: body.text,
          teamid: body.teamid,
          matchid: body.matchid
        }
      return null
  }
}

export const isEmpty = (data: object | null) =>
  !data || Object.keys(data).length === 0