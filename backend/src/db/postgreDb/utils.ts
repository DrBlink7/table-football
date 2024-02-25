import { CreatePlayerDTO, DeletePlayerDTO, DeleteTeamDTO, EditPlayerDTO, GetPlayersDTO, GetTeamsDTO, GetMatchesDTO, TeamInfo, DeleteMatchDTO, GetRankingsDTO } from "../../api/routers/types";
import { DBMatchesTable, DBMatchesTeamsPlayerTable, DBPlayersTable, DBRankingsCols, DBTeamsPlayerTable, DBTeamsTable } from "./types";

export const formatTagList = (rows: DBPlayersTable[]): GetPlayersDTO =>
  rows.map(row => ({
    id: row.id,
    name: row.name
  }))

export const formatCreatedPlayerRow = (rows: DBPlayersTable[], name: string): CreatePlayerDTO =>
  ({ id: rows[0].id, name })

export const formatEditedPlayerRow = (rows: DBPlayersTable[], name: string): EditPlayerDTO =>
  ({ id: rows[0].id, name })

export const formatDeletedPlayerRow = (rows: DBPlayersTable[]): DeletePlayerDTO =>
  ({ id: rows[0].id })

export const formatTeamList = (rows: DBTeamsPlayerTable[]): GetTeamsDTO =>
  rows.map(row => ({
    id: row.id,
    defender: { id: row.defender, name: row.defender_name },
    striker: { id: row.striker, name: row.striker_name }
  }))

export const formatDeletedTeamRow = (rows: DBTeamsTable[]): DeleteTeamDTO =>
  ({ id: rows[0].id });

export const formatMatchList = (rows: DBMatchesTeamsPlayerTable[]): GetMatchesDTO =>
  rows.map(row => ({
    blue: {
      id: row.blue_team_id,
      striker: row.blue_striker_name,
      defender: row.blue_defender_name,
      score: row.blue_score
    },
    red: {
      id: row.red_team_id,
      striker: row.red_striker_name,
      defender: row.red_defender_name,
      score: row.red_score
    },
    id: row.match_id,
    status: row.status
  }))

export const isAnInvalidMatch = (blueInfo: TeamInfo, redInfo: TeamInfo) =>
  blueInfo.playerIds.some(blueId => redInfo.playerIds.some(redId => redId === blueId))

export const formatDeletedMatch = (row: DBMatchesTable): DeleteMatchDTO => ({ id: row.id })

export const formatRankings = (rows: DBRankingsCols[]) => {
  const teamMap = rows.reduce((acc: Record<number, GetRankingsDTO>, row) => {
    acc[row.blue_team_id] = acc[row.blue_team_id] || {
      striker: { id: row.blue_striker_id, name: row.blue_striker_name },
      defender: { id: row.blue_defender_id, name: row.blue_defender_name },
      id: row.blue_team_id,
      points: 0,
      goalsScored: 0,
      goalsConceded: 0,
      gamePlayed: 0
    }
    acc[row.blue_team_id].goalsScored += row.blue_score
    acc[row.blue_team_id].goalsConceded += row.red_score
    acc[row.blue_team_id].gamePlayed += 1
    if (row.blue_score > row.red_score) {
      acc[row.blue_team_id].points += 3
    } else if (row.blue_score === row.red_score) {
      acc[row.blue_team_id].points += 1
    }

    acc[row.red_team_id] = acc[row.red_team_id] || {
      striker: { id: row.red_striker_id, name: row.red_striker_name },
      defender: { id: row.red_defender_id, name: row.red_defender_name },
      id: row.red_team_id,
      points: 0,
      goalsScored: 0,
      goalsConceded: 0,
      gamePlayed: 0
    };
    acc[row.red_team_id].goalsScored += row.red_score
    acc[row.red_team_id].goalsConceded += row.blue_score
    acc[row.red_team_id].gamePlayed += 1
    if (row.red_score > row.blue_score) {
      acc[row.red_team_id].points += 3
    } else if (row.red_score === row.blue_score) {
      acc[row.red_team_id].points += 1
    }
    return acc
  }, {} satisfies Record<number, GetRankingsDTO>)

  return sortResult(Object.values(teamMap))
}

export const sortResult = (result: GetRankingsDTO[]) => {
  const res = [...result]
  res.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points
    } else if ((a.goalsScored - a.goalsConceded) !== (b.goalsScored - b.goalsConceded)) {
      return (b.goalsScored - b.goalsConceded) - (a.goalsScored - a.goalsConceded)
    } else if (a.goalsScored !== b.goalsScored) {
      return b.goalsScored - a.goalsScored
    } else {
      return a.goalsConceded - b.goalsConceded
    }
  })
  return res
}
