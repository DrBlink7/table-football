import { tablePlayers, tableTeams, tableMatches } from "../../config"
import { dbConfig } from "."
import { CheckOnGoingCols, DBMatchesTable, DBMatchesTeamsPlayerTable } from "./types"
import { CreateMatchDTO, DeleteMatchDTO, EditMatchDTO } from "../../api/routers/types";
import { formatMatchList, isAnInvalidMatch } from "./utils";
import { getTeamInfo } from "./team";
import { formatDeletedMatch } from "./utils";

export const getMatches = async () => {
  const client = await dbConfig.connect()
  const query = `
    SELECT 
      m.id AS match_id,
      m.blue AS blue_team_id,
      m.red AS red_team_id,
      m.blue_score,
      m.red_score,
      m.status,
      bt.striker AS blue_striker_id,
      bt.defender AS blue_defender_id,
      rt.striker AS red_striker_id,
      rt.defender AS red_defender_id,
      ptb.name AS blue_striker_name,
      ptd.name AS blue_defender_name,
      ptr.name AS red_striker_name,
      prd.name AS red_defender_name
    FROM ${tableMatches} AS m
    LEFT JOIN ${tableTeams} AS bt ON m.blue = bt.id
    LEFT JOIN ${tableTeams} AS rt ON m.red = rt.id
    LEFT JOIN ${tablePlayers} AS ptb ON bt.striker = ptb.id
    LEFT JOIN ${tablePlayers} AS ptd ON bt.defender = ptd.id
    LEFT JOIN ${tablePlayers} AS ptr ON rt.striker = ptr.id
    LEFT JOIN ${tablePlayers} AS prd ON rt.defender = prd.id
  `

  const results = await client.query<DBMatchesTeamsPlayerTable>(query)
  client.release()

  if (!results.rowCount || results.rowCount === 0) return []

  return formatMatchList(results.rows)
}

export const createMatch = async (blue: number, red: number): Promise<CreateMatchDTO> => {
  const client = await dbConfig.connect()
  const blueInfo = await getTeamInfo(blue)
  const redInfo = await getTeamInfo(red)

  if (isAnInvalidMatch(blueInfo, redInfo)) throw new Error('blue, red teams provided are invalid')

  const query = `
    INSERT INTO ${tableMatches} (blue, red, blue_score, red_score, status)
    VALUES ($1, $2, 0, 0, 'preparing')
    RETURNING id;
  `
  const values = [blue, red]
  const results = await client.query<{ id: DBMatchesTable['id'] }>(query, values)

  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Insert failed, no rows created.')

  return {
    blue: {
      id: blue,
      striker: blueInfo.striker,
      defender: blueInfo.defender,
      score: 0
    },
    red: {
      id: red,
      striker: redInfo.striker,
      defender: redInfo.defender,
      score: 0
    },
    id: results.rows[0].id,
    status: 'preparing'
  } satisfies CreateMatchDTO
}

export const editMatch = async (id: string, blue: number, red: number): Promise<EditMatchDTO> => {
  const numeric_id = Number(id)
  if (isNaN(numeric_id)) throw new Error('Edit failed, id not valid.')

  const client = await dbConfig.connect()
  const blueInfo = await getTeamInfo(blue)
  const redInfo = await getTeamInfo(red)

  if (isAnInvalidMatch(blueInfo, redInfo)) throw new Error('blue, red teams provided are invalid')

  const query = `
    UPDATE ${tableMatches}
    SET red = $2, blue = $3
    WHERE id = $1 AND status = 'preparing'
    RETURNING id, red, blue
  `

  const values = [numeric_id, red, blue]

  const results = await client.query<DBMatchesTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Edit failed, no rows edited (ex. cannot edit already started matches).')

  const row = results.rows[0]

  return {
    blue: {
      id: row.blue,
      striker: blueInfo.striker,
      defender: blueInfo.defender,
      score: 0
    },
    red: {
      id: row.red,
      striker: redInfo.striker,
      defender: redInfo.defender,
      score: 0
    },
    id: row.id,
    status: 'preparing'
  } satisfies EditMatchDTO
}

export const deleteMatch = async (id: string): Promise<DeleteMatchDTO> => {
  const numeric_id = Number(id)

  if (isNaN(numeric_id)) throw new Error('Delete failed, id not valid.')

  const client = await dbConfig.connect()
  const query = `
    DELETE FROM ${tableMatches}
    WHERE id = $1 AND status != 'ongoing'
    RETURNING id
  `
  const values = [numeric_id]

  const results = await client.query<DBMatchesTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Delete failed, no rows deleted.')

  return formatDeletedMatch(results.rows[0])
}

export const startMatch = async (id: number): Promise<void> => {
  const client = await dbConfig.connect()

  const checkOngoingMatchQuery = `
  SELECT COUNT(*) AS ongoing_matches_count
  FROM ${tableMatches}
  WHERE status = 'ongoing'
  `;

  const ongoingMatchesResult = await client.query<CheckOnGoingCols>(checkOngoingMatchQuery);

  if (ongoingMatchesResult.rowCount && ongoingMatchesResult.rowCount > 0) {
    throw new Error('Edit failed, ex. it can be only one ongoing match.')
  }

  const query = `
  UPDATE ${tableMatches}
  SET status = 'ongoing'
  WHERE id=$1 AND status = 'preparing'
  `
  const values = [id]

  const results = await client.query<DBMatchesTable>(query, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error('Edit failed, ex. only preparing match can start.')

  return
}

export const addGoal = async (matchid: number, teamid: number) => {
  const client = await dbConfig.connect()
  const select = `
  SELECT red, blue
  FROM ${tableMatches}
  WHERE id = $1 AND status = 'ongoing'
  `
  const values = [matchid];
  const queryResult = await client.query<DBMatchesTable>(select, values)

  if (!queryResult.rowCount || queryResult.rowCount === 0) throw new Error(`Edit failed, matchid not valid`)

  const blue = queryResult.rows[0].blue;
  const red = queryResult.rows[0].red;
  if (teamid !== blue && teamid !== red) throw new Error(`Edit failed: no team ${teamid} in match ${matchid}.`)

  const scoreToUpdate = (teamid === blue) ? 'blue_score' : 'red_score'

  const updateQuery = `
  UPDATE ${tableMatches}
  SET ${scoreToUpdate} = ${scoreToUpdate} + 1
  WHERE id = $1 AND status = 'ongoing'
  `

  const results = await client.query<DBMatchesTable>(updateQuery, values)
  client.release()

  if (!results.rowCount || results.rowCount === 0) throw new Error(`Edit failed`)

  return
}
