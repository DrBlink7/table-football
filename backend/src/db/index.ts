import { DbType } from "../config";
import { dbConnectorPostgreDb } from "./postgreDb";
import { GetPlayersDTO, EditPlayerDTO, DeletePlayerDTO, CreatePlayerDTO } from "../api/routers/types";

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === "postgres") return dbConnectorPostgreDb;

  throw new Error("DB type not supported: " + dbType);
};

export type Connector = {
  getPlayers: () => Promise<GetPlayersDTO>
  createPlayer: (name: string) => Promise<CreatePlayerDTO>
  editPlayer: (id: string, name: string) => Promise<EditPlayerDTO>
  deletePlayer: (id: string) => Promise<DeletePlayerDTO>
};
