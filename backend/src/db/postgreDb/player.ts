import { tablePlayers } from "../../config"
import { dbConfig } from "."
import { DBPlayersTable } from "./types"
import { formatTagList } from "./utils"

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
