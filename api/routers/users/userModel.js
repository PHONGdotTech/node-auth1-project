const db = require("../../../data/dbConfig.js")

module.exports = {
    getUsers,
    addUser,
    findBy
}

function getUsers(){
    return db(`users`)
            .select('id', 'username', 'password')
}

function addUser(user){
    return db('users').insert(user, "id")
}

function findBy(filter) {
    return db('users')
      .select('id', 'username', 'password')
      .where(filter)
      .first()
  }