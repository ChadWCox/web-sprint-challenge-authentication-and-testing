const db = require('../../data/dbConfig.js');

module.exports = {
    addUser,
    findUsers,
    findUserBy,
    findUserById,  
}

function findUsers() {
    return db('users').select('id', 'username').orderBy('id');
}

function findUserBy(filter) {
    return db('users').where(filter).orderBy('id');
}

async function addUser(user) {
    const [id] = await db('users').insert(user, 'id');
    return findUserById(id);
}

function findUserById(id) {
    return db('users').where({ id }).first();
}