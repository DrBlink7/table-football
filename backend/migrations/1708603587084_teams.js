exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('teams', {
    id: { type: 'serial', primaryKey: true },
    striker: { type: 'integer', notNull: true, references: 'players(id)' },
    defender: { type: 'integer', notNull: true, references: 'players(id)' },
  });

  pgm.addConstraint('teams', 'check_striker_defender_unique', {
    check: 'striker <> defender'
  });

  pgm.addConstraint('teams', 'unique_combination', {
    unique: ['striker', 'defender'],
    exclusion: {
      using: 'gist',
      with: 'int4range(striker, striker, \'[]\') && int4range(defender, defender, \'[]\')',
      where: '(striker <> defender)'
    }
  });
};

exports.down = pgm => {
  pgm.dropTable('teams');
};
