exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('matches', {
    id: { type: 'serial', primaryKey: true },
    blue: { type: 'integer', notNull: true, references: 'teams(id)' },
    red: { type: 'integer', notNull: true, references: 'teams(id)' },
    blue_score: { type: 'integer', notNull: true},
    red_score: { type: 'integer', notNull: true},
    status: {
      type: 'text',
      notNull: true,
      check: "status IN ('preparing', 'ongoing', 'ended')"
    }
  })

  pgm.addConstraint('matches', 'check_blue_red_unique', {
    check: 'blue <> red'
  })

  pgm.addConstraint('matches', 'unique_team_combination', {
    unique: ['blue', 'red'],
    exclusion: {
      using: 'gist',
      with: 'int4range(blue, blue, \'[]\') && int4range(red, red, \'[]\')',
      where: '(blue <> red)'
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('matches')
}
