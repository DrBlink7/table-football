import { DbPort, DbHost, DbName, DbPass, DbUser } from "../../config";
import { Connector } from "..";
import { Pool } from "pg";
import { createPlayer, deletePlayer, editPlayer, getPlayers } from "./player";
import { createTeam, deleteTeam, editTeam, getTeams } from "./team";

export const dbConfig = new Pool({
  host: DbHost,
  user: DbUser,
  database: DbName,
  password: DbPass,
  port: Number(DbPort),
});

export const dbConnectorPostgreDb: Connector = {
  getPlayers: getPlayers,
  createPlayer: createPlayer,
  editPlayer: editPlayer,
  deletePlayer: deletePlayer,
  getTeams: getTeams,
  createTeam: createTeam,
  editTeam: editTeam,
  deleteTeam: deleteTeam
}
