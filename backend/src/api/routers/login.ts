import { Logger } from "../../logger";
import { asyncErrWrapper, formatError } from "../errorHandling";
import express from "express";

export const loginRouter = express.Router();

/**
 * @swagger
 * /api/login/authenticate:
 *   post:
 *     summary: Login with credential, use token to call APIs that needs authentication.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user email
 *                 required: true
 *               password:
 *                 type: string
 *                 description: user password
 *                 required: true
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: user token
 *                 email:
 *                   type: string
 *                   description: user email
 *       400:
 *         description: Request error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Login
 */

loginRouter.post("/authenticate", asyncErrWrapper(async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      const errorMessage = 'email and password are required when authenticating';
      const errorCode = '001-Auth';
      Logger.writeException(new Error(errorMessage), errorCode, 'loginRouter/authenticate');

      return res.status(400).json({ code: errorCode, message: errorMessage });
    }
    const token = 'token' // TODO: here we need to call UMA or another login provider.
    return res.status(200).json({ token, email });
  } catch (err) {
    const { status, error } = formatError(err, '001-Auth', 'loginRouter/authenticate');

    return res.status(status).json(error);
  }
}));

