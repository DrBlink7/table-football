import { DbPort, DbHost, DbName, DbPass, DbUser } from "../../config";
import { Connector } from "..";
import { Pool } from "pg";
import { createPlayer, deletePlayer, editPlayer, getPlayers } from "./player";
import { createTeam, deleteTeam, editTeam, getTeams } from "./team";
import { getMatches, createMatch, editMatch, deleteMatch, startMatch, addGoal, getMatch } from "./matches";
import { getDefenderStats, getPlayerStat, getRankings, getStrikerStats, getTeamStat } from "./stats";

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
  deleteTeam: deleteTeam,
  getMatches: getMatches,
  getMatch: getMatch,
  createMatch: createMatch,
  editMatch: editMatch,
  deleteMatch: deleteMatch,
  getRankings: getRankings,
  getDefenderStats: getDefenderStats,
  getStrikerStats: getStrikerStats,
  startMatch: startMatch,
  addGoal: addGoal,
  getPlayerStat: getPlayerStat,
  getTeamStat: getTeamStat
}
