import { DbType } from "../config";
import { dbConnectorPostgreDb } from "./postgreDb";
import { GetPlayersDTO, EditPlayerDTO, DeletePlayerDTO, CreatePlayerDTO, DeleteTeamDTO, EditTeamDTO, CreateTeamDTO, GetTeamsDTO, GetMatchesDTO } from "../api/routers/types";

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === "postgres") return dbConnectorPostgreDb;

  throw new Error("DB type not supported: " + dbType);
};

export type Connector = {
  getPlayers: () => Promise<GetPlayersDTO>
  createPlayer: (name: string) => Promise<CreatePlayerDTO>
  editPlayer: (id: string, name: string) => Promise<EditPlayerDTO>
  deletePlayer: (id: string) => Promise<DeletePlayerDTO>
  getTeams: () => Promise<GetTeamsDTO>
  createTeam: (striker: number, defender: number) => Promise<CreateTeamDTO>
  editTeam: (id: string, striker: number, defender: number) => Promise<EditTeamDTO>
  deleteTeam: (id: string) => Promise<DeleteTeamDTO>
  getMatches: () => Promise<GetMatchesDTO>
};
