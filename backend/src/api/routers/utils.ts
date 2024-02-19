
export const decodeToken = (token: string): string => token.split(" ")[1]; // TODO: here we will check and validate token extracting the user_id