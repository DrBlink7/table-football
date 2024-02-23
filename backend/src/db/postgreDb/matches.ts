import { tablePlayers, tableTeams, tableMatches } from "../../config"
import { dbConfig } from "."
import { DBMatchesTeamsPlayerTable } from "./types"
import { formatMatchList } from "./utils";

export const getMatches = async () => {
  const client = await dbConfig.connect();
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
  `;

  const results = await client.query<DBMatchesTeamsPlayerTable>(query);
  client.release();

  if (!results.rowCount || results.rowCount === 0) return [];

  return formatMatchList(results.rows);
}
