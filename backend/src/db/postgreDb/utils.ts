import { DBPlayersTable } from "./types";

export const formatTagList = (rows: DBPlayersTable[]) =>
  rows.map(row => ({
    id: row.id,
    name: row.name
  }))
