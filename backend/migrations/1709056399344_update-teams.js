exports.shorthands = undefined

exports.up = async pgm => {
  pgm.addColumn('teams', {
    name: { type: 'text' }
  })

  await pgm.sql(`
    UPDATE teams 
    SET name = 'default_value' 
    WHERE name IS NULL
  `)

  pgm.alterColumn('teams', 'name', {
    notNull: true
  })
}

exports.down = pgm => {
  pgm.dropColumn('teams', 'name')
}
