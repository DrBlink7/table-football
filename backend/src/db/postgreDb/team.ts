import { tableMatches, tablePlayers, tableTeams } from "../../config"
import { dbConfig } from "."
import { formatDeletedTeamRow, formatTeamList } from "./utils"
import { getPlayerInfo } from "./player"
import { DBTeamsPlayerTable, DBTeamsTable } from "./types"
import { CreateTeamDTO, EditTeamDTO, TeamInfo } from "../../api/routers/types"

export const getTeams = async () => {
  const client = await dbConfig.connect()
  const query = `
    SELECT teams.id,
           teams.name AS team_name,
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

export const createTeam = async (striker: number, defender: number, name: string) => {
  const client = await dbConfig.connect()
  const query = `
    INSERT INTO ${tableTeams} (striker, defender, name)
    VALUES ($1, $2, $3)
    RETURNING id, name
  `
  const values = [striker, defender, name]

  const results = await client.query<{ id: number, name: string }>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Insert failed, no rows created.')

  const strikerInfo = await getPlayerInfo(striker)
  const defenderInfo = await getPlayerInfo(defender)

  return {
    striker: { id: striker, name: strikerInfo.name },
    defender: { id: defender, name: defenderInfo.name },
    name: results.rows[0].name,
    id: results.rows[0].id
  } satisfies CreateTeamDTO
}

export const editTeam = async (id: string, striker: number, defender: number, name: string) => {
  const numeric_id = Number(id)
  if (isNaN(numeric_id)) throw new Error('Edit failed, id not valid.')

  const client = await dbConfig.connect()

  const search = `
  SELECT EXISTS (
    SELECT 1
    FROM ${tableMatches}
    WHERE (red = $1 OR blue = $1)
  )
  `
  const result = await client.query<{ exists: boolean }>(search, [numeric_id])
  const exists = result.rows[0].exists
  const query = exists
    ? `
    UPDATE ${tableTeams}
    SET name = $2
    WHERE id = $1
    RETURNING id, striker, defender, name
    `
    : `
    UPDATE ${tableTeams}
    SET striker = $2, defender = $3, name = $4
    WHERE id = $1
    RETURNING id, striker, defender, name
    `

  const values = exists ? [numeric_id, name] : [numeric_id, striker, defender, name]

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
    name: results.rows[0].name,
    id: results.rows[0].id
  } satisfies EditTeamDTO
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

export const getTeamInfo = async (id: number): Promise<TeamInfo> => {
  const client = await dbConfig.connect()
  const query = `
  SELECT teams.id,
         teams.striker,
         teams.name AS team_name,
         striker_players.name AS striker_name,
         teams.defender,
         defender_players.name AS defender_name
  FROM ${tableTeams} AS teams
  INNER JOIN ${tablePlayers} AS striker_players ON teams.striker = striker_players.id
  INNER JOIN ${tablePlayers} AS defender_players ON teams.defender = defender_players.id
  WHERE teams.id = $1
  `
  const values = [id]
  const results = await client.query<DBTeamsPlayerTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error(`Team with ID ${id} not found.`)
  const row = results.rows[0]

  return ({
    playerIds: [row.striker, row.defender],
    striker: row.striker_name,
    name: row.team_name,
    defender: row.defender_name
  }) satisfies TeamInfo
}