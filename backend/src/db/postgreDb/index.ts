import { DbPort, DbHost, DbName, DbPass, DbUser } from "../../config";
import { Connector } from "..";
import { Pool } from "pg";
import { getPlayers } from "./player";

export const dbConfig = new Pool({
  host: DbHost,
  user: DbUser,
  database: DbName,
  password: DbPass,
  port: Number(DbPort),
});

export const dbConnectorPostgreDb: Connector = {
  getPlayers: getPlayers
}
