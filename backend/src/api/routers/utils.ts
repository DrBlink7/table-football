
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