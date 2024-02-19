exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('players', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'text', notNull: true, unique: true }
  });
};

exports.down = pgm => {
  pgm.dropTable('players');
};
