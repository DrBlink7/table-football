import { CreatePlayerDTO, DeletePlayerDTO, EditPlayerDTO, GetPlayersDTO } from "../../api/routers/types";
import { DBPlayersTable } from "./types";

export const formatTagList = (rows: DBPlayersTable[]): GetPlayersDTO =>
  rows.map(row => ({
    id: row.id,
    name: row.name
  }))

export const formatCreatedRow = (rows: DBPlayersTable[], name: string): CreatePlayerDTO =>
  ({ id: rows[0].id, name })

export const formatDeletedRow = (rows: DBPlayersTable[]): DeletePlayerDTO =>
  ({ id: rows[0].id })

export const formatEditedRow = (rows: DBPlayersTable[], name: string): EditPlayerDTO =>
  ({ id: rows[0].id, name })