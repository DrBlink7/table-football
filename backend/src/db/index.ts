import { DbType } from "../config";
import { dbConnectorPostgreDb } from "./postgreDb";
import { Player } from "./types";

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === "postgres") return dbConnectorPostgreDb;

  throw new Error("DB type not supported: " + dbType);
};

export type Connector = {
  getPlayers: () => Promise<Player[]>
};
