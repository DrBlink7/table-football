/* eslint-disable max-len */
import { formatDataForTable, filterMatches } from './f'
import { expect } from '@jest/globals'
import { teams, players, rankings, strikers, defenders } from '../Cypress/utils'
import en from '../Translations/en'

const t = (key: string): string => {
  const keys = key.split('.')
  return (en as unknown as any)[keys[0]][keys[1]]
}
const teamsColumns: Column[] = [
  { id: 'type', label: 'Icon', sortable: false },
  { id: 'id', label: 'Team ID', sortable: true },
  { id: 'defender_name', label: 'Defender', sortable: true },
  { id: 'defender_id', label: 'Defender ID', sortable: true },
  { id: 'striker_name', label: 'Striker', sortable: true },
  { id: 'striker_id', label: 'Striker ID', sortable: true }
]
const teamsRows = [
  {
    id: 6,
    defender: { id: 1, name: 'Valerio Lundini' },
    striker: { id: 2, name: 'Daniele Fabbri' },
    type: 'Team',
    defender_id: 1,
    defender_name: 'Valerio Lundini',
    striker_id: 2,
    striker_name: 'Daniele Fabbri'
  },
  {
    id: 7,
    defender: { id: 2, name: 'Daniele Fabbri' },
    striker: { id: 1, name: 'Valerio Lundini' },
    type: 'Team',
    defender_id: 2,
    defender_name: 'Daniele Fabbri',
    striker_id: 1,
    striker_name: 'Valerio Lundini'
  },
  {
    id: 9,
    defender: { id: 1, name: 'Valerio Lundini' },
    striker: { id: 12, name: 'Alessandro Gori' },
    type: 'Team',
    defender_id: 1,
    defender_name: 'Valerio Lundini',
    striker_id: 12,
    striker_name: 'Alessandro Gori'
  },
  {
    id: 13,
    defender: { id: 2, name: 'Daniele Fabbri' },
    striker: { id: 7, name: 'Tommaso Faoro' },
    type: 'Team',
    defender_id: 2,
    defender_name: 'Daniele Fabbri',
    striker_id: 7,
    striker_name: 'Tommaso Faoro'
  },
  {
    id: 14,
    defender: { id: 7, name: 'Tommaso Faoro' },
    striker: { id: 2, name: 'Daniele Fabbri' },
    type: 'Team',
    defender_id: 7,
    defender_name: 'Tommaso Faoro',
    striker_id: 2,
    striker_name: 'Daniele Fabbri'
  }
]
const playersColumns: Column[] = [
  { id: 'type', label: 'Icon', sortable: false },
  { id: 'id', label: 'Player ID', sortable: true },
  { id: 'name', label: 'Player Name', sortable: true }
]
const playersRows = [
  { id: 1, name: 'Valerio Lundini', type: 'Player' },
  { id: 2, name: 'Daniele Fabbri', type: 'Player' },
  { id: 3, name: 'Daniele Tinti', type: 'Player' },
  { id: 4, name: 'Stefano Rapone', type: 'Player' },
  { id: 5, name: 'Davide Calgaro', type: 'Player' },
  { id: 6, name: 'Carmine Del Grosso', type: 'Player' },
  { id: 7, name: 'Tommaso Faoro', type: 'Player' },
  { id: 8, name: 'Francesco Mileto', type: 'Player' },
  { id: 9, name: 'Giorgia Fumo', type: 'Player' },
  { id: 10, name: 'Eleazaro Rossi', type: 'Player' },
  { id: 11, name: 'Michela Giraud', type: 'Player' },
  { id: 12, name: 'Alessandro Gori', type: 'Player' }
]
const rankingColumns = [
  { id: 'type', label: 'Icon', sortable: false },
  { id: 'striker_name', label: 'Striker', sortable: true },
  { id: 'striker_id', label: 'Striker ID', sortable: true },
  { id: 'defender_name', label: 'Defender', sortable: true },
  { id: 'defender_id', label: 'Defender ID', sortable: true },
  { id: 'id', label: 'Team ID', sortable: true },
  { id: 'points', label: 'Points', sortable: true },
  { id: 'goalsScored', label: 'Scored', sortable: true },
  { id: 'goalsConceded', label: 'Conceded', sortable: true },
  { id: 'gamesPlayed', label: 'Played', sortable: true },
  { id: 'name', label: 'Team Name', sortable: true }
]
const rankingRows = [
  {
    striker: { id: 3, name: 'Daniele Tinti' },
    defender: { id: 4, name: 'Stefano Rapone' },
    id: 3,
    points: 6,
    goalsScored: 6,
    goalsConceded: 4,
    gamesPlayed: 2,
    name: 'Team 3',
    type: 'Team',
    defender_id: 4,
    defender_name: 'Stefano Rapone',
    striker_id: 3,
    striker_name: 'Daniele Tinti'
  },
  {
    striker: { id: 12, name: 'Alessandro Gori' },
    defender: { id: 9, name: 'Giorgia Fumo' },
    id: 11,
    points: 3,
    goalsScored: 7,
    goalsConceded: 4,
    gamesPlayed: 1,
    name: 'Team 11',
    type: 'Team',
    defender_id: 9,
    defender_name: 'Giorgia Fumo',
    striker_id: 12,
    striker_name: 'Alessandro Gori'
  },
  {
    striker: { id: 9, name: 'Giorgia Fumo' },
    defender: { id: 2, name: 'Daniele Fabbri' },
    id: 9,
    points: 3,
    goalsScored: 6,
    goalsConceded: 5,
    gamesPlayed: 1,
    name: 'Team 9',
    type: 'Team',
    defender_id: 2,
    defender_name: 'Daniele Fabbri',
    striker_id: 9,
    striker_name: 'Giorgia Fumo'
  },
  {
    striker: { id: 5, name: 'Davide Calgaro' },
    defender: { id: 6, name: 'Carmine Del Grosso' },
    id: 6,
    points: 3,
    goalsScored: 4,
    goalsConceded: 3,
    gamesPlayed: 1,
    name: 'Team 6',
    type: 'Team',
    defender_id: 6,
    defender_name: 'Carmine Del Grosso',
    striker_id: 5,
    striker_name: 'Davide Calgaro'
  },
  {
    striker: { id: 1, name: 'Valerio Lundini' },
    defender: { id: 10, name: 'Eleazaro Rossi' },
    id: 5,
    points: 3,
    goalsScored: 3,
    goalsConceded: 2,
    gamesPlayed: 1,
    name: 'Team 5',
    type: 'Team',
    defender_id: 10,
    defender_name: 'Eleazaro Rossi',
    striker_id: 1,
    striker_name: 'Valerio Lundini'
  },
  {
    striker: { id: 1, name: 'Valerio Lundini' },
    defender: { id: 2, name: 'Daniele Fabbri' },
    id: 1,
    points: 1,
    goalsScored: 4,
    goalsConceded: 4,
    gamesPlayed: 1,
    name: 'Team 1',
    type: 'Team',
    defender_id: 2,
    defender_name: 'Daniele Fabbri',
    striker_id: 1,
    striker_name: 'Valerio Lundini'
  },
  {
    striker: { id: 9, name: 'Giorgia Fumo' },
    defender: { id: 11, name: 'Michela Giraud' },
    id: 4,
    points: 1,
    goalsScored: 6,
    goalsConceded: 7,
    gamesPlayed: 2,
    name: 'Team 4',
    type: 'Team',
    defender_id: 11,
    defender_name: 'Michela Giraud',
    striker_id: 9,
    striker_name: 'Giorgia Fumo'
  },
  {
    striker: { id: 12, name: 'Alessandro Gori' },
    defender: { id: 11, name: 'Michela Giraud' },
    id: 8,
    points: 0,
    goalsScored: 5,
    goalsConceded: 6,
    gamesPlayed: 1,
    name: 'Team 8',
    type: 'Team',
    defender_id: 11,
    defender_name: 'Michela Giraud',
    striker_id: 12,
    striker_name: 'Alessandro Gori'
  },
  {
    striker: { id: 2, name: 'Daniele Fabbri' },
    defender: { id: 1, name: 'Valerio Lundini' },
    id: 2,
    points: 0,
    goalsScored: 1,
    goalsConceded: 2,
    gamesPlayed: 1,
    name: 'Team 2',
    type: 'Team',
    defender_id: 1,
    defender_name: 'Valerio Lundini',
    striker_id: 2,
    striker_name: 'Daniele Fabbri'
  },
  {
    striker: { id: 7, name: 'Tommaso Faoro' },
    defender: { id: 8, name: 'Francesco Mileto' },
    id: 7,
    points: 0,
    goalsScored: 6,
    goalsConceded: 8,
    gamesPlayed: 2,
    name: 'Team 7',
    type: 'Team',
    defender_id: 8,
    defender_name: 'Francesco Mileto',
    striker_id: 7,
    striker_name: 'Tommaso Faoro'
  },
  {
    striker: { id: 3, name: 'Daniele Tinti' },
    defender: { id: 7, name: 'Tommaso Faoro' },
    id: 10,
    points: 0,
    goalsScored: 4,
    goalsConceded: 7,
    gamesPlayed: 1,
    name: 'Team 10',
    type: 'Team',
    defender_id: 7,
    defender_name: 'Tommaso Faoro',
    striker_id: 3,
    striker_name: 'Daniele Tinti'
  }
]
const strikersColumns = [
  { id: 'type', label: 'Icon', sortable: false },
  { id: 'id', label: 'Player ID', sortable: true },
  { id: 'name', label: 'Player Name', sortable: true },
  { id: 'goalsScored', label: 'Scored Goals', sortable: true },
  {
    id: 'goalsScoredPerMatch',
    label: 'Scored Goals (Match)',
    sortable: true
  },
  { id: 'gamesPlayed', label: 'Games Played', sortable: true }
]
const strikerRows = [
  {
    id: 12,
    name: 'Alessandro Gori',
    goalsScored: 12,
    goalsScoredPerMatch: 6,
    gamesPlayed: 2,
    type: 'Player'
  },
  {
    id: 9,
    name: 'Giorgia Fumo',
    goalsScored: 12,
    goalsScoredPerMatch: 4,
    gamesPlayed: 3,
    type: 'Player'
  },
  {
    id: 5,
    name: 'Davide Calgaro',
    goalsScored: 4,
    goalsScoredPerMatch: 4,
    gamesPlayed: 1,
    type: 'Player'
  },
  {
    id: 1,
    name: 'Valerio Lundini',
    goalsScored: 7,
    goalsScoredPerMatch: 3.5,
    gamesPlayed: 2,
    type: 'Player'
  },
  {
    id: 3,
    name: 'Daniele Tinti',
    goalsScored: 10,
    goalsScoredPerMatch: 3.33,
    gamesPlayed: 3,
    type: 'Player'
  },
  {
    id: 7,
    name: 'Tommaso Faoro',
    goalsScored: 6,
    goalsScoredPerMatch: 3,
    gamesPlayed: 2,
    type: 'Player'
  },
  {
    id: 2,
    name: 'Daniele Fabbri',
    goalsScored: 1,
    goalsScoredPerMatch: 1,
    gamesPlayed: 1,
    type: 'Player'
  }
]
const defenderColumns = [
  { id: 'type', label: 'Icon', sortable: false },
  { id: 'id', label: 'Player ID', sortable: true },
  { id: 'name', label: 'Player Name', sortable: true },
  { id: 'goalsConceded', label: 'Conceded Goals', sortable: true },
  {
    id: 'goalsConcededPerMatch',
    label: 'Conceded Goals (Match)',
    sortable: true
  },
  { id: 'gamesPlayed', label: 'Games Played', sortable: true }
]
const defenderRows = [
  {
    id: 1,
    name: 'Valerio Lundini',
    goalsConceded: 2,
    goalsConcededPerMatch: 2,
    gamesPlayed: 1,
    type: 'Player'
  },
  {
    id: 10,
    name: 'Eleazaro Rossi',
    goalsConceded: 2,
    goalsConcededPerMatch: 2,
    gamesPlayed: 1,
    type: 'Player'
  },
  {
    id: 4,
    name: 'Stefano Rapone',
    goalsConceded: 4,
    goalsConcededPerMatch: 2,
    gamesPlayed: 2,
    type: 'Player'
  },
  {
    id: 6,
    name: 'Carmine Del Grosso',
    goalsConceded: 3,
    goalsConcededPerMatch: 3,
    gamesPlayed: 1,
    type: 'Player'
  },
  {
    id: 9,
    name: 'Giorgia Fumo',
    goalsConceded: 4,
    goalsConcededPerMatch: 4,
    gamesPlayed: 1,
    type: 'Player'
  },
  {
    id: 8,
    name: 'Francesco Mileto',
    goalsConceded: 8,
    goalsConcededPerMatch: 4,
    gamesPlayed: 2,
    type: 'Player'
  },
  {
    id: 11,
    name: 'Michela Giraud',
    goalsConceded: 13,
    goalsConcededPerMatch: 4.33,
    gamesPlayed: 3,
    type: 'Player'
  },
  {
    id: 2,
    name: 'Daniele Fabbri',
    goalsConceded: 9,
    goalsConcededPerMatch: 4.5,
    gamesPlayed: 2,
    type: 'Player'
  },
  {
    id: 7,
    name: 'Tommaso Faoro',
    goalsConceded: 7,
    goalsConcededPerMatch: 7,
    gamesPlayed: 1,
    type: 'Player'
  }
]

describe('formatDataForTable function for teams table', () => {
  const result = formatDataForTable(teams, t as any, 'Team')

  it('should format data for table correctly for teams', () => {
    expect(result).toHaveProperty('columns')
    expect(result).toHaveProperty('rows')

    result.columns.forEach(column => {
      expect(column).toHaveProperty('id')
      expect(column).toHaveProperty('label')
      expect(column).toHaveProperty('sortable')
    })
  })
  result.rows.forEach((dataItem, index) => {
    it('should generate defender row correctly, index: ' + index, () => {
      expect(dataItem.defender).toEqual(teamsRows[index].defender)
    })
    it('should generate defender_id row correctly, index: ' + index, () => {
      expect(dataItem.defender_id).toEqual(teamsRows[index].defender_id)
    })
    it('should generate defender_name row correctly, index: ' + index, () => {
      expect(dataItem.defender_name).toEqual(teamsRows[index].defender_name)
    })
    it('should generate id row correctly, index: ' + index, () => {
      expect(dataItem.id).toEqual(teamsRows[index].id)
    })
    it('should generate striker row correctly, index: ' + index, () => {
      expect(dataItem.striker).toEqual(teamsRows[index].striker)
    })
    it('should generate striker_id row correctly, index: ' + index, () => {
      expect(dataItem.striker_id).toEqual(teamsRows[index].striker_id)
    })
    it('should generate striker_name row correctly, index: ' + index, () => {
      expect(dataItem.striker_name).toEqual(teamsRows[index].striker_name)
    })
    it('should generate type row correctly, index: ' + index, () => {
      expect(dataItem.type).toEqual(teamsRows[index].type)
    })
  })
  it('should have correct column id values', () => {
    const h = [...result.columns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    const mh = [...teamsColumns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(h)).toBe(true)
    expect(h).toEqual(mh)
  })
  it('should have correct column label values', () => {
    const c = [...result.columns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    const mc = [...teamsColumns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(c)).toBe(true)
    expect(c).toEqual(mc)
  })
})

describe('formatDataForTable function for players table', () => {
  const result = formatDataForTable(players, t as any, 'Player')

  it('should format data for table correctly for players', () => {
    expect(result).toHaveProperty('columns')
    expect(result).toHaveProperty('rows')

    result.columns.forEach(column => {
      expect(column).toHaveProperty('id')
      expect(column).toHaveProperty('label')
      expect(column).toHaveProperty('sortable')
    })
  })
  result.rows.forEach((dataItem, index) => {
    it('should generate id row correctly, index: ' + index, () => {
      expect(dataItem.id).toEqual(playersRows[index].id)
    })
    it('should generate name row correctly, index: ' + index, () => {
      expect(dataItem.name).toEqual(playersRows[index].name)
    })
    it('should generate type row correctly, index: ' + index, () => {
      expect(dataItem.type).toEqual(playersRows[index].type)
    })
  })
  it('should have correct column id values', () => {
    const h = [...result.columns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    const mh = [...playersColumns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(h)).toBe(true)
    expect(h).toEqual(mh)
  })
  it('should have correct column label values', () => {
    const c = [...result.columns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    const mc = [...playersColumns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(c)).toBe(true)
    expect(c).toEqual(mc)
  })
})

describe('formatDataForTable function for rankings table', () => {
  const result = formatDataForTable(rankings, t as any, 'Team')
  it('should format data for table correctly for rankings', () => {
    expect(result).toHaveProperty('columns')
    expect(result).toHaveProperty('rows')

    result.columns.forEach(column => {
      expect(column).toHaveProperty('id')
      expect(column).toHaveProperty('label')
      expect(column).toHaveProperty('sortable')
    })
  })
  result.rows.forEach((dataItem, index) => {
    it('should generate id row correctly, index: ' + index, () => {
      expect(dataItem.id).toEqual(rankingRows[index].id)
    })
    it('should generate name row correctly, index: ' + index, () => {
      expect(dataItem.name).toEqual(rankingRows[index].name)
    })
    it('should generate type row correctly, index: ' + index, () => {
      expect(dataItem.type).toEqual(rankingRows[index].type)
    })
    it('should generate defender row correctly, index: ' + index, () => {
      expect(dataItem.defender).toEqual(rankingRows[index].defender)
    })
    it('should generate defender_id row correctly, index: ' + index, () => {
      expect(dataItem.defender_id).toEqual(rankingRows[index].defender_id)
    })
    it('should generate defender_name row correctly, index: ' + index, () => {
      expect(dataItem.defender_name).toEqual(rankingRows[index].defender_name)
    })
    it('should generate gamesPlayed row correctly, index: ' + index, () => {
      expect(dataItem.gamesPlayed).toEqual(rankingRows[index].gamesPlayed)
    })
    it('should generate goalsConceded row correctly, index: ' + index, () => {
      expect(dataItem.goalsConceded).toEqual(rankingRows[index].goalsConceded)
    })
    it('should generate goalsScored row correctly, index: ' + index, () => {
      expect(dataItem.goalsScored).toEqual(rankingRows[index].goalsScored)
    })
    it('should generate points row correctly, index: ' + index, () => {
      expect(dataItem.points).toEqual(rankingRows[index].points)
    })
    it('should generate striker row correctly, index: ' + index, () => {
      expect(dataItem.striker).toEqual(rankingRows[index].striker)
    })
    it('should generate striker_id row correctly, index: ' + index, () => {
      expect(dataItem.striker_id).toEqual(rankingRows[index].striker_id)
    })
    it('should generate striker_name row correctly, index: ' + index, () => {
      expect(dataItem.striker_name).toEqual(rankingRows[index].striker_name)
    })
  })
  it('should have correct column id values', () => {
    const h = [...result.columns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    const mh = [...rankingColumns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(h)).toBe(true)
    expect(h).toEqual(mh)
  })
  it('should have correct column label values', () => {
    const c = [...result.columns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    const mc = [...rankingColumns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(c)).toBe(true)
    expect(c).toEqual(mc)
  })
})

describe('formatDataForTable function for strikers table', () => {
  const result = formatDataForTable(strikers, t as any, 'Player')
  it('should format data for table correctly for strikers', () => {
    expect(result).toHaveProperty('columns')
    expect(result).toHaveProperty('rows')

    result.columns.forEach(column => {
      expect(column).toHaveProperty('id')
      expect(column).toHaveProperty('label')
      expect(column).toHaveProperty('sortable')
    })
  })
  result.rows.forEach((dataItem, index) => {
    it('should generate id row correctly, index: ' + index, () => {
      expect(dataItem.id).toEqual(strikerRows[index].id)
    })
    it('should generate name row correctly, index: ' + index, () => {
      expect(dataItem.name).toEqual(strikerRows[index].name)
    })
    it('should generate type row correctly, index: ' + index, () => {
      expect(dataItem.type).toEqual(strikerRows[index].type)
    })
    it('should generate gamesPlayed row correctly, index: ' + index, () => {
      expect(dataItem.gamesPlayed).toEqual(strikerRows[index].gamesPlayed)
    })
    it('should generate goalsScored row correctly, index: ' + index, () => {
      expect(dataItem.goalsScored).toEqual(strikerRows[index].goalsScored)
    })
    it('should generate goalsScoredPerMatch row correctly, index: ' + index, () => {
      expect(dataItem.goalsScoredPerMatch).toEqual(strikerRows[index].goalsScoredPerMatch)
    })
  })
  it('should have correct column id values', () => {
    const h = [...result.columns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    const mh = [...strikersColumns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(h)).toBe(true)
    expect(h).toEqual(mh)
  })
  it('should have correct column label values', () => {
    const c = [...result.columns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    const mc = [...strikersColumns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(c)).toBe(true)
    expect(c).toEqual(mc)
  })
})
describe('formatDataForTable function for defenders table', () => {
  const result = formatDataForTable(defenders, t as any, 'Player')
  it('should format data for table correctly for defenders', () => {
    expect(result).toHaveProperty('columns')
    expect(result).toHaveProperty('rows')

    result.columns.forEach(column => {
      expect(column).toHaveProperty('id')
      expect(column).toHaveProperty('label')
      expect(column).toHaveProperty('sortable')
    })
  })
  result.rows.forEach((dataItem, index) => {
    it('should generate id row correctly, index: ' + index, () => {
      expect(dataItem.id).toEqual(defenderRows[index].id)
    })
    it('should generate name row correctly, index: ' + index, () => {
      expect(dataItem.name).toEqual(defenderRows[index].name)
    })
    it('should generate type row correctly, index: ' + index, () => {
      expect(dataItem.type).toEqual(defenderRows[index].type)
    })
    it('should generate gamesPlayed row correctly, index: ' + index, () => {
      expect(dataItem.gamesPlayed).toEqual(defenderRows[index].gamesPlayed)
    })
    it('should generate goalsConceded row correctly, index: ' + index, () => {
      expect(dataItem.goalsConceded).toEqual(defenderRows[index].goalsConceded)
    })
    it('should generate goalsConcededPerMatch row correctly, index: ' + index, () => {
      expect(dataItem.goalsConcededPerMatch).toEqual(defenderRows[index].goalsConcededPerMatch)
    })
  })
  it('should have correct column id values', () => {
    const h = [...result.columns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    const mh = [...defenderColumns].sort((a, b) => a.id.toLocaleLowerCase() >= b.id.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(h)).toBe(true)
    expect(h).toEqual(mh)
  })
  it('should have correct column label values', () => {
    const c = [...result.columns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    const mc = [...defenderColumns].sort((a, b) => a.label.toLocaleLowerCase() >= b.label.toLocaleLowerCase() ? 1 : -1)
    expect(Array.isArray(c)).toBe(true)
    expect(c).toEqual(mc)
  })
})

describe('filterMatches function', () => {
  it('should filter matches correctly', () => {
    const matchList: Matches = [
      { id: 1, blue: { id: 101, striker: 'John', defender: 'Doe', score: 2, name: 'Blue Team' }, red: { id: 201, striker: 'Alice', defender: 'Bob', score: 1, name: 'Red Team' }, status: 'ended' },
      { id: 2, blue: { id: 102, striker: 'Jane', defender: 'Smith', score: 3, name: 'Blue Team' }, red: { id: 202, striker: 'Eve', defender: 'Johnson', score: 2, name: 'Red Team' }, status: 'ongoing' }
    ]

    const result = filterMatches(matchList)

    expect(result).toHaveProperty('onGoing')
    expect(result).toHaveProperty('ended')
    expect(result).toHaveProperty('preparing')

    expect(result.onGoing).toBeInstanceOf(Array)
    expect(result.ended).toBeInstanceOf(Array)
    expect(result.preparing).toBeInstanceOf(Array)

    expect(result.onGoing.length + result.ended.length + result.preparing.length).toBe(matchList.length)

    const onGoing = matchList.filter(match => match.status === 'ongoing')
    const ended = matchList.filter(match => match.status === 'ended')
    const preparing = matchList.filter(match => match.status === 'preparing')

    expect(result.onGoing).toEqual(onGoing)
    expect(result.ended).toEqual(ended)
    expect(result.preparing).toEqual(preparing)
  })
})
