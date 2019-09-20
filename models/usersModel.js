const db = require('../database/dbConfig.js');

module.exports = {
    findById,
    insert
}


function findById(id) {
    return db('users')
    .select()
    .where({ id })
    .first()
}

function insert(user) {
    return db('users')
    .insert(user)
    .then(ids => {
        const [id] = ids;
        return findById(id)
    })
}