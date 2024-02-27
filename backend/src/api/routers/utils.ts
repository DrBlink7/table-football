import { secretKey } from "../../config";
import { BroadcastType, SSEMessage } from "./types";
import CryptoJS from 'crypto-js'

/**
 * With decodeToken we will check and validate token evenutally extracting the user_id
 * @param token bearer token sent by FE user (right now we're sending email)
 * @returns user_id of the bearer
 */
export const decodeToken = (token: string): string => decryptData(token.split(" ")[1])
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

export const encryptData = (data: string): string =>
  CryptoJS.AES.encrypt(data, secretKey).toString()

export const decryptData = (encryptedData: string): string => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey)

  return decryptedBytes.toString(CryptoJS.enc.Utf8)
}
