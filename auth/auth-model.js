const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

// function add(user) {
//   return db("users")
//     .insert(user, "id")
//     .then(ids => {
//       const { id } = ids;
//       return findById(id);
//     });
// }

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
