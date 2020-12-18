
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Chad', password: 'cox'},
        {id: 2, username: 'Cathy', password: 'cox'},
      ]);
    });
};
