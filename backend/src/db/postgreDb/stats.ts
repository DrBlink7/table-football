import { tableMatches, tablePlayers, tableTeams } from "../../config"
import { dbConfig } from "."
import { DBRankingsCols } from "./types"
import { formatRankings } from "./utils";
import { GetRankingsDTO } from "../../api/routers/types";

export const getRankings = async (): Promise<GetRankingsDTO[]> => {
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
      WHERE m.status = 'ended'
  `;

  const results = await client.query<DBRankingsCols>(query);
  client.release();

  if (!results.rowCount || results.rowCount === 0) return [];

  return formatRankings(results.rows);
}

