import { tablePlayers, tableTeams, tableMatches } from "../../config"
import { dbConfig } from "."
import { DBMatchesTeamsPlayerTable } from "./types"
import { CreateMatchDTO } from "../../api/routers/types";
import { formatMatchList, isAnInvalidMatch } from "./utils";
import { getTeamInfo } from "./team";

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
  const results = await client.query<{ id: number }>(query, values)

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
