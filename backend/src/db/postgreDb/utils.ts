import { CreatePlayerDTO, DeletePlayerDTO, DeleteTeamDTO, EditPlayerDTO, GetPlayersDTO, GetTeamsDTO, GetMatchesDTO } from "../../api/routers/types";
import { DBMatchesTeamsPlayerTable, DBPlayersTable, DBTeamsPlayerTable, DBTeamsTable } from "./types";

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
  }));
