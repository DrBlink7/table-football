import { DeleteTeamDTO, GetRankingsDTO, GetTeamsDTO, TeamInfo } from "../../api/routers/types";
import { DBMatchesTable, DBMatchesTeamsPlayerTable, DBRankingsCols, DBTeamsPlayerTable, DBTeamsTable } from "./types";
import { formatTagList, formatCreatedPlayerRow, formatEditedPlayerRow, formatDeletedPlayerRow, formatTeamList, formatDeletedTeamRow, formatMatchList, isAnInvalidMatch, formatDeletedMatch, formatRankings, sortRankingResult, sortDefenderResult, sortStrikerResult } from "./utils";

describe('formatTagList', () => {
  it('should format tag list correctly', () => {
    const input = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    const output = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    expect(formatTagList(input)).toEqual(output);
  });
});

describe('formatCreatedPlayerRow', () => {
  it('should format created player row correctly', () => {
    const input = [{ id: 1, name: 'John' }];
    const name = 'John';
    const output = { id: 1, name: 'John' };
    expect(formatCreatedPlayerRow(input, name)).toEqual(output);
  });
});

describe('formatEditedPlayerRow', () => {
  it('should format edited player row correctly', () => {
    const input = [{ id: 1, name: 'John' }];
    const name = 'Jane';
    const output = { id: 1, name: 'Jane' };
    expect(formatEditedPlayerRow(input, name)).toEqual(output);
  });
});

describe('formatDeletedPlayerRow', () => {
  it('should format deleted player row correctly', () => {
    const input = [{ id: 1, name: 'John' }];
    const output = { id: 1 };
    expect(formatDeletedPlayerRow(input)).toEqual(output);
  });
});

describe('formatTeamList', () => {
  it('should format team list correctly', () => {
    const input: DBTeamsPlayerTable[] = [{ id: 1, defender: 101, striker: 201, defender_name: 'Jane', striker_name: 'John', name: 'Team1', team_name: 'Team1' }];
    const output: GetTeamsDTO = [{ id: 1, defender: { id: 101, name: 'Jane' }, striker: { id: 201, name: 'John' }, name: 'Team1' }];
    expect(formatTeamList(input)).toEqual(output);
  });
});

describe('formatDeletedTeamRow', () => {
  it('should format deleted team row correctly', () => {
    const input: DBTeamsTable[] = [{ id: 1, striker: 101, defender: 201, name: 'Team 1' }];
    const output: DeleteTeamDTO = { id: 1 };
    expect(formatDeletedTeamRow(input)).toEqual(output);
  });
});

describe('formatMatchList', () => {
  it('should format rows into GetMatchesDTO', () => {
    const rows = [
      {
        blue_team_id: 1,
        blue_striker_name: 'Blue Striker 1',
        blue_defender_name: 'Blue Defender 1',
        blue_score: 1,
        red_team_id: 2,
        red_striker_name: 'Red Striker 1',
        red_defender_name: 'Red Defender 1',
        red_score: 2,
        match_id: 1,
        status: 'ongoing',
        blue: 1,
        red: 2,
        defender: 2,
        striker: 1,
        id: 1,
        blue_team_name: 'Team 1',
        red_team_name: 'Team 2',
        name: ''
      },
      {
        blue_team_id: 3,
        blue_striker_name: 'Blue Striker 2',
        blue_defender_name: 'Blue Defender 2',
        blue_score: 2,
        red_team_id: 4,
        red_striker_name: 'Red Striker 2',
        red_defender_name: 'Red Defender 2',
        red_score: 1,
        match_id: 2,
        status: 'ended',
        blue: 3,
        red: 4,
        defender: 3,
        striker: 4,
        id: 2,
        blue_team_name: 'Team 3',
        red_team_name: 'Team 4',
        name: ''
      }
    ] satisfies DBMatchesTeamsPlayerTable[]

    const result = formatMatchList(rows);

    expect(result).toEqual([
      {
        blue: { id: 1, striker: 'Blue Striker 1', defender: 'Blue Defender 1', score: 1, name: 'Team 1' },
        red: { id: 2, striker: 'Red Striker 1', defender: 'Red Defender 1', score: 2, name: 'Team 2' },
        id: 1,
        status: 'ongoing'
      },
      {
        blue: { id: 3, striker: 'Blue Striker 2', defender: 'Blue Defender 2', score: 2, name: 'Team 3' },
        red: { id: 4, striker: 'Red Striker 2', defender: 'Red Defender 2', score: 1, name: 'Team 4' },
        id: 2,
        status: 'ended'
      }
    ]);
  });
});

describe('isAnInvalidMatch', () => {
  it('should return true if there are overlapping playerIds', () => {
    const blueInfo: TeamInfo = { playerIds: [1, 2], striker: 'Blue Striker', defender: 'Blue Defender', name: 'Team 1' };
    const redInfo: TeamInfo = { playerIds: [2, 3], striker: 'Red Striker', defender: 'Red Defender', name: 'Team 2' };

    const result = isAnInvalidMatch(blueInfo, redInfo);

    expect(result).toBe(true);
  });

  it('should return false if there are no overlapping playerIds', () => {
    const blueInfo: TeamInfo = { playerIds: [1, 2], striker: 'Blue Striker', defender: 'Blue Defender', name: 'Team 1' };
    const redInfo: TeamInfo = { playerIds: [3, 4], striker: 'Red Striker', defender: 'Red Defender', name: 'Team 2' };

    const result = isAnInvalidMatch(blueInfo, redInfo);

    expect(result).toBe(false);
  });
});

describe('formatDeletedMatch', () => {
  it('should format rows into DeleteMatchDTO', () => {
    const row: DBMatchesTable = { id: 1, blue: 1, blue_score: 1, red: 2, red_score: 2, status: 'ended' };

    const result = formatDeletedMatch(row);

    expect(result).toEqual({ id: 1 });
  });
});

describe('formatRankings function', () => {
  it('should format rankings correctly', () => {
    const rows: DBRankingsCols[] = [
      { match_id: 1, status: 'ended', blue_team_id: 1, blue_striker_id: 101, blue_striker_name: 'John', blue_defender_id: 102, blue_defender_name: 'Doe', blue_score: 2, red_team_id: 2, red_striker_id: 201, red_striker_name: 'Alice', red_defender_id: 202, red_defender_name: 'Bob', red_score: 1, blue_team_name: 'Team 1', red_team_name: 'Team 2' },
    ]
    const result = formatRankings(rows)
    expect(result).toHaveLength(rows.length * 2)
    result.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('points');
      expect(item).toHaveProperty('goalsScored');
      expect(item).toHaveProperty('goalsConceded');
      expect(item).toHaveProperty('gamesPlayed');
      expect(item.striker).toHaveProperty('id');
      expect(item.striker).toHaveProperty('name');
      expect(item.defender).toHaveProperty('id');
      expect(item.defender).toHaveProperty('name');
    })
  })
})

describe('sortRankingResult function', () => {
  it('should sort ranking results correctly', () => {
    const result: GetRankingsDTO[] = [
      { defender: { id: 1, name: 'john' }, striker: { id: 2, name: 'jane' }, id: 1, points: 10, goalsScored: 5, goalsConceded: 3, gamesPlayed: 4, name: 'Team 1' },
      { defender: { id: 3, name: 'pat' }, striker: { id: 4, name: 'daria' }, id: 2, points: 12, goalsScored: 6, goalsConceded: 4, gamesPlayed: 3, name: 'Team 2' }
    ]
    const sortedResult = sortRankingResult(result);
    expect(sortedResult).toHaveLength(result.length);
    expect(sortedResult[0].points).toBeGreaterThanOrEqual(sortedResult[1].points);
  })
})

describe('sortDefenderResult function', () => {
  it('should sort defender stats correctly', () => {
    const result = [
      { id: 101, name: 'John', goalsConceded: 8, goalsConcededPerMatch: 1.6, gamesPlayed: 5 },
      { id: 102, name: 'Doe', goalsConceded: 5, goalsConcededPerMatch: 1.25, gamesPlayed: 4 }
    ]
    const sortedResult = sortDefenderResult(result)
    expect(sortedResult).toHaveLength(result.length)
    expect(sortedResult[1].goalsConcededPerMatch).toBeGreaterThanOrEqual(sortedResult[0].goalsConcededPerMatch);
  })
})

describe('sortStrikerResult function', () => {
  it('should sort striker stats correctly', () => {
    const result = [
      { id: 201, name: 'Alice', goalsScored: 12, goalsScoredPerMatch: 2.4, gamesPlayed: 5 },
      { id: 202, name: 'Bob', goalsScored: 8, goalsScoredPerMatch: 1.6, gamesPlayed: 5 }
    ]
    const sortedResult = sortStrikerResult(result)
    expect(sortedResult).toHaveLength(result.length)
    expect(sortedResult[0].goalsScoredPerMatch).toBeGreaterThanOrEqual(sortedResult[1].goalsScoredPerMatch)
  })
})

