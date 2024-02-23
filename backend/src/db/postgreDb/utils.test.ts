import { formatTagList, formatCreatedPlayerRow, formatEditedPlayerRow, formatDeletedPlayerRow, formatTeamList, formatDeletedTeamRow } from "./utils";

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
