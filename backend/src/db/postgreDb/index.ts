import { DbPort, DbHost, DbName, DbPass, DbUser } from "../../config";
import { Connector } from "..";
import { Pool } from "pg";
import { createPlayer, deletePlayer, editPlayer, getPlayers } from "./player";

export const dbConfig = new Pool({
  host: DbHost,
  user: DbUser,
  database: DbName,
  password: DbPass,
  port: Number(DbPort),
});

export const dbConnectorPostgreDb: Connector = {
  createPlayer: createPlayer,
  getPlayers: getPlayers,
  editPlayer: editPlayer,
  deletePlayer: deletePlayer
}
