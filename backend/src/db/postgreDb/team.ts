import { tablePlayers, tableTeams } from "../../config"
import { dbConfig } from "."
import { formatDeletedTeamRow, formatTeamList } from "./utils"
import { getPlayerInfo } from "./player"
import { DBTeamsPlayerTable, DBTeamsTable } from "./types"
import { CreateTeamDTO, EditTeamDTO } from "../../api/routers/types"

export const getTeams = async () => {
  const client = await dbConfig.connect()
  const query = `
    SELECT teams.id, 
           teams.striker, 
           striker_players.name AS striker_name,
           teams.defender,
           defender_players.name AS defender_name
    FROM ${tableTeams} AS teams
    INNER JOIN ${tablePlayers} AS striker_players ON teams.striker = striker_players.id
    INNER JOIN ${tablePlayers} AS defender_players ON teams.defender = defender_players.id
    ORDER BY teams.id;
  `
  const results = await client.query<DBTeamsPlayerTable>(query)
  client.release()

  if (!results.rowCount || results.rowCount === 0) return []

  return formatTeamList(results.rows)
}

export const createTeam = async (striker: number, defender: number) => {
  const client = await dbConfig.connect()
  const query = `
    INSERT INTO ${tableTeams} (striker, defender)
    VALUES ($1, $2)
    RETURNING id;
  `
  const values = [striker, defender]

  const results = await client.query<{ id: number }>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Insert failed, no rows created.')

  const strikerInfo = await getPlayerInfo(striker)
  const defenderInfo = await getPlayerInfo(defender)

  return {
    striker: { id: striker, name: strikerInfo.name },
    defender: { id: defender, name: defenderInfo.name },
    id: results.rows[0].id
  } satisfies CreateTeamDTO
}

export const editTeam = async (id: string, striker: number, defender: number) => {
  const numeric_id = Number(id)
  if (isNaN(numeric_id)) throw new Error('Edit failed, id not valid.')

  const client = await dbConfig.connect()
  const query = `
    UPDATE ${tableTeams}
    SET striker = $2, defender = $3
    WHERE id = $1
    RETURNING id, striker, defender
  `

  const values = [numeric_id, striker, defender]

  const results = await client.query<DBTeamsPlayerTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Edit failed, no rows edited.')

  const updatedStriker = results.rows[0].striker
  const updatedDefender = results.rows[0].defender
  const strikerInfo = await getPlayerInfo(updatedStriker)
  const defenderInfo = await getPlayerInfo(updatedDefender)

  return {
    striker: { id: updatedStriker, name: strikerInfo.name },
    defender: { id: updatedDefender, name: defenderInfo.name },
    id: results.rows[0].id
  } as EditTeamDTO
}

export const deleteTeam = async (id: string) => {
  const numeric_id = Number(id)

  if (isNaN(numeric_id)) throw new Error('Delete failed, id not valid.')

  const client = await dbConfig.connect()
  const query = `
    DELETE FROM ${tableTeams}
    WHERE id = $1
    RETURNING id
  `
  const values = [numeric_id]

  const results = await client.query<DBTeamsTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Delete failed, no rows deleted.')

  return formatDeletedTeamRow(results.rows)
}
