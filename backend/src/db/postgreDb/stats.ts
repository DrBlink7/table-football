import { tableMatches, tablePlayers, tableTeams } from "../../config"
import { dbConfig } from "."
import { DBDStrikersCols, DBDefendersCols, DBRankingsCols } from "./types"
import { formatRankings, sortStrikerResult } from "./utils";
import { GetDefenderStatsDTO, GetRankingsDTO, GetStrikerStatsDTO } from "../../api/routers/types";
import { sortDefenderResult } from "./utils";

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

export const getDefenderStats = async (): Promise<GetDefenderStatsDTO[]> => {
  const client = await dbConfig.connect();

  const query = `
    SELECT
      t.defender AS defender_red_id,
      m.red_score AS score_red,
      t2.defender AS defender_blue_id,
      m.blue_score AS score_blue,
      p.name AS defender_red_name,
      p2.name AS defender_blue_name
    FROM matches AS m
    LEFT JOIN teams AS t ON m.red = t.id
    LEFT JOIN teams AS t2 ON m.blue = t2.id
    LEFT JOIN players AS p ON t.defender = p.id
    LEFT JOIN players AS p2 ON t2.defender = p2.id
    WHERE m.status = 'ended';
  `;

  const results = await client.query<DBDefendersCols>(query);
  client.release();

  if (!results.rowCount || results.rowCount === 0) return [];

  const defenderStats: Record<number, GetDefenderStatsDTO> = results.rows.reduce((acc: Record<number, GetDefenderStatsDTO>, row) => {
    const addDefenderStats = (defenderId: number, score: number) => {
      if (!acc[defenderId]) {
        acc[defenderId] = {
          id: defenderId,
          name: row.defender_red_id === defenderId ? row.defender_red_name : row.defender_blue_name,
          goalsConceded: 0,
          goalsConcededPerMatch: 0,
          gamesPlayed: 0
        }
      }
      acc[defenderId].goalsConceded += score
      acc[defenderId].gamesPlayed++
      acc[defenderId].goalsConcededPerMatch = acc[defenderId].goalsConceded / acc[defenderId].gamesPlayed
    }

    addDefenderStats(row.defender_red_id, row.score_blue)
    addDefenderStats(row.defender_blue_id, row.score_red)

    return acc
  }, {})

  const result = Object.values(defenderStats);

  return sortDefenderResult(result)
}

export const getStrikerStats = async (): Promise<GetStrikerStatsDTO[]> => {
  const client = await dbConfig.connect();

  const query = `
    SELECT
      t.striker AS striker_red_id,
      m.red_score AS score_red,
      t2.striker AS striker_blue_id,
      m.blue_score AS score_blue,
      p.name AS striker_red_name,
      p2.name AS striker_blue_name
    FROM matches AS m
    LEFT JOIN teams AS t ON m.red = t.id
    LEFT JOIN teams AS t2 ON m.blue = t2.id
    LEFT JOIN players AS p ON t.striker = p.id
    LEFT JOIN players AS p2 ON t2.striker = p2.id
    WHERE m.status = 'ended';
  `;

  const results = await client.query<DBDStrikersCols>(query);
  client.release();

  if (!results.rowCount || results.rowCount === 0) return [];

  const strikerStats: Record<number, GetStrikerStatsDTO> = results.rows.reduce((acc: Record<number, GetStrikerStatsDTO>, row) => {
    const addStrikerStats = (strikerId: number, score: number) => {
      if (!acc[strikerId]) {
        acc[strikerId] = {
          id: strikerId,
          name: row.striker_red_id === strikerId ? row.striker_red_name : row.striker_blue_name,
          goalsScored: 0,
          goalsScoredPerMatch: 0,
          gamesPlayed: 0
        }
      }
      acc[strikerId].goalsScored += score
      acc[strikerId].gamesPlayed++
      acc[strikerId].goalsScoredPerMatch = acc[strikerId].goalsScored / acc[strikerId].gamesPlayed
    }

    addStrikerStats(row.striker_red_id, row.score_red)
    addStrikerStats(row.striker_blue_id, row.score_blue)

    return acc
  }, {})

  const result = Object.values(strikerStats);

  return sortStrikerResult(result)
}
