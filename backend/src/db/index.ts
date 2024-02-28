import { DbType } from "../config";
import { dbConnectorPostgreDb } from "./postgreDb";
import { GetPlayersDTO, EditPlayerDTO, DeletePlayerDTO, CreatePlayerDTO, DeleteTeamDTO, EditTeamDTO, CreateTeamDTO, GetTeamsDTO, GetMatchesDTO, CreateMatchDTO, EditMatchDTO, DeleteMatchDTO, GetRankingsDTO, GetDefenderStatsDTO, GetStrikerStatsDTO, GetMatchDTO, GetPlayerStatDTO, GetTeamStatDTO } from "../api/routers/types";

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === "postgres") return dbConnectorPostgreDb

  throw new Error("DB type not supported: " + dbType)
}

export type Connector = {
  getPlayers: () => Promise<GetPlayersDTO>
  createPlayer: (name: string) => Promise<CreatePlayerDTO>
  editPlayer: (id: string, name: string) => Promise<EditPlayerDTO>
  deletePlayer: (id: string) => Promise<DeletePlayerDTO>
  getTeams: () => Promise<GetTeamsDTO>
  createTeam: (striker: number, defender: number, name: string) => Promise<CreateTeamDTO>
  editTeam: (id: string, striker: number, defender: number, name: string) => Promise<EditTeamDTO>
  deleteTeam: (id: string) => Promise<DeleteTeamDTO>
  getMatches: () => Promise<GetMatchesDTO>
  getMatch: (id: string) => Promise<GetMatchDTO>
  createMatch: (blue: number, red: number) => Promise<CreateMatchDTO>
  editMatch: (id: string, blue: number, red: number) => Promise<EditMatchDTO>
  deleteMatch: (id: string) => Promise<DeleteMatchDTO>
  getRankings: () => Promise<GetRankingsDTO[]>
  getDefenderStats: () => Promise<GetDefenderStatsDTO[]>
  getStrikerStats: () => Promise<GetStrikerStatsDTO[]>
  startMatch: (id: number) => Promise<void>
  addGoal: (matchid: number, teamid: number) => Promise<void>
  getPlayerStat: (id: string) => Promise<GetPlayerStatDTO>
  getTeamStat: (id: string) => Promise<GetTeamStatDTO>
}
