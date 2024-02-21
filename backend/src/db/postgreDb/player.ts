import { tablePlayers } from "../../config"
import { dbConfig } from "."
import { DBPlayersTable } from "./types"
import { formatCreatedRow, formatTagList } from "./utils"
import { formatEditedRow } from "./utils"
import { formatDeletedRow } from "./utils"

export const getPlayers = async () => {
  const client = await dbConfig.connect()
  const query = `
  SELECT * FROM ${tablePlayers}
  ORDER BY id
  `
  const results = await client.query<DBPlayersTable>(query)
  client.release()

  if (!results.rowCount || results.rowCount === 0) return []

  return formatTagList(results.rows)
}

export const createPlayer = async (name: string) => {
  const client = await dbConfig.connect()
  const query = `
  INSERT INTO ${tablePlayers} (name)
  VALUES ($1)
  RETURNING id;
  `
  const values = [name]

  const results = await client.query<DBPlayersTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Insert failed, no rows created.')

  return formatCreatedRow(results.rows, name)
}

export const editPlayer = async (id: string, name: string) => {
  const numeric_id = Number(id)
  if (isNaN(numeric_id)) throw new Error('Edit failed, id not valid.')

  const client = await dbConfig.connect()
  const query = `
  UPDATE ${tablePlayers}
  SET name = $2
  WHERE id = $1
  RETURNING id
  `
  const values = [numeric_id, name]
  const results = await client.query<DBPlayersTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Edit failed, no rows edited.')

  return formatEditedRow(results.rows, name)
}

export const deletePlayer = async (id: string) => {
  const numeric_id = Number(id)

  if (isNaN(numeric_id)) throw new Error('Delete failed, id not valid.')

  const client = await dbConfig.connect()
  const query = `
    DELETE FROM ${tablePlayers}
    WHERE id = $1
    RETURNING id
  `
  const values = [numeric_id]

  const results = await client.query<DBPlayersTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Delete failed, no rows deleted.')

  return formatDeletedRow(results.rows)
}
