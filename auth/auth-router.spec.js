const request = require("supertest");
const Users = require("./auth-model");
const db = require("../database/dbConfig");

describe("insert()", () => {
  //   it("should insert users into the db", async () => {
  //     // insert a record
  //     await Users.add({ username: "newguy", password: "1234asdf" });
  //     let users = await db("users");
  //     // assert the record was inserted
  //     expect(users).toHaveLength(2);
  //   });

  it("should return newTest username", async () => {
    let id = 4;
    let user = await db("users")
      .where({ id })
      .first();

    expect(user.username).toBe("newTest");
  });
});
