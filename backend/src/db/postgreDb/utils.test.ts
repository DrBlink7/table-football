import { DBMatchesTable, DBMatchesTeamsPlayerTable } from "./types";
import { formatTagList, formatCreatedPlayerRow, formatEditedPlayerRow, formatDeletedPlayerRow, formatTeamList, formatDeletedTeamRow, formatMatchList, isAnInvalidMatch, formatDeletedMatch } from "./utils";

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
    const input = [{ id: 1, defender: 101, striker: 201, defender_name: 'Jane', striker_name: 'John' }];
    const output = [{ id: 1, defender: { id: 101, name: 'Jane' }, striker: { id: 201, name: 'John' } }];
    expect(formatTeamList(input)).toEqual(output);
  });
});

describe('formatDeletedTeamRow', () => {
  it('should format deleted team row correctly', () => {
    const input = [{ id: 1, striker: 101, defender: 201 }];
    const output = { id: 1 };
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
        id: 1
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
        id: 2
      }
    ] satisfies DBMatchesTeamsPlayerTable[]

    const result = formatMatchList(rows);

    expect(result).toEqual([
      {
        blue: { id: 1, striker: 'Blue Striker 1', defender: 'Blue Defender 1', score: 1 },
        red: { id: 2, striker: 'Red Striker 1', defender: 'Red Defender 1', score: 2 },
        id: 1,
        status: 'ongoing'
      },
      {
        blue: { id: 3, striker: 'Blue Striker 2', defender: 'Blue Defender 2', score: 2 },
        red: { id: 4, striker: 'Red Striker 2', defender: 'Red Defender 2', score: 1 },
        id: 2,
        status: 'ended'
      }
    ]);
  });
});

describe('isAnInvalidMatch', () => {
  it('should return true if there are overlapping playerIds', () => {
    const blueInfo = { playerIds: [1, 2], striker: 'Blue Striker', defender: 'Blue Defender' };
    const redInfo = { playerIds: [2, 3], striker: 'Red Striker', defender: 'Red Defender' };

    const result = isAnInvalidMatch(blueInfo, redInfo);

    expect(result).toBe(true);
  });

  it('should return false if there are no overlapping playerIds', () => {
    const blueInfo = { playerIds: [1, 2], striker: 'Blue Striker', defender: 'Blue Defender' };
    const redInfo = { playerIds: [3, 4], striker: 'Red Striker', defender: 'Red Defender' };

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