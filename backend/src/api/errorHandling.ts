import { Logger } from "../logger";
import { Request, Response, NextFunction } from "express";
import { ErrorType, ErrorPayload } from "./types";
import { FunType } from "../types";
import { load } from 'cheerio'
/**
 * @swagger
 * components:
 *   schemas:
 *     GenericError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 *     GetPlayersError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 *     CreatePlayerError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 *     EditPlayerError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 *     DeletePlayerError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 */

export const formatError = (
  error: ErrorType,
  code: string = "001-Unknown",
  handledAt?: string
): ErrorPayload => {
  if (error.response)
    return error.response.data
      ? formatResponseData(error, code, handledAt)
      : formatErrorCode(error, code, handledAt);
  else
    return formatInternalError(error, code, handledAt);
};

export const apiErrorHandler = (
  err: ErrorType,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.response) {
    Logger.writeException(err.response.data, "001-Unknown", "apiErrorHandler");
    return res
      .status(err.response.status)
      .json({ message: err.message, response: err.response.data });
  } else {
    Logger.writeException(err, "001-Unknown", "apiErrorHandler");
    return res.status(400).json({ message: "Default error message" + err });
  }
};

export const asyncErrWrapper =
  (fun: FunType) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fun(req, res, next)).catch(next);
  };

const logResposeData = (
  handledAt: string | undefined,
  error: any,
  code: string
) => handledAt
    ? Logger.writeException(new Error(error), code, handledAt)
    : Logger.writeException(error, code);

const logResponseCode = (
  handledAt: string | undefined,
  error: any,
  code: string
) =>
  handledAt
    ? Logger.writeException(new Error(`External API error code: ${error.code}`), code, handledAt)
    : Logger.writeException(new Error(`External API error code: ${error.code}`), code);

const logSimpleError = (
  handledAt: string | undefined,
  error: string,
  code: string
) =>
  handledAt
    ? Logger.writeException(new Error(error), code, handledAt)
    : Logger.writeException(new Error(error), code);

const formatInternalError = (
  error: any,
  code: string,
  handledAt: string | undefined
): ErrorPayload => {
  const message = error.toString()
  logSimpleError(handledAt, message, code);
  return {
    status: 500,
    error: { code: code, message },
  };
};

const formatErrorCode = (
  error: any,
  code: string,
  handledAt: string | undefined
): ErrorPayload => {
  logResponseCode(handledAt, error, code);
  return {
    status: error.response.status,
    error: {
      code: code,
      message: error.code,
    },
  };
};

const formatResponseData = (
  error: any,
  code: string,
  handledAt: string | undefined
): ErrorPayload => {
  const data = error.response.data.message
    ? error.response.data.message
    : error.response.data
  const message = formatMessageData(data)

  logResposeData(handledAt, message, code)
  return {
    status: error.response.status,
    error: {
      code: code,
      message: message,
    }
  }
}

const formatMessageData = (data: any): string => {
  if (!data) return 'Missing Error Information'
  if (typeof data !== "string") return data.toString()

  if (data.includes('doctype'))
    return getTextFromHTML(data, 'p')

  if (data.includes('DOCTYPE'))
    return getTextFromHTML(data, 'pre')

  if (data.includes('html'))
    return getTextFromHTML(data, 'html')

  return data
}

const getTextFromHTML = (data: any, tag: string) => {
  const $ = load(data);
  const textInsideTag = $(tag).text();

  return textInsideTag ?? 'Server Error'
}
