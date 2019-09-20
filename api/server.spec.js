const request = require("supertest");

const server = require("./server");

// describe("auth-router.js", () => {
//   describe("GET /users", () => {
//     it("returns 200", () => {
//       return request(authRoute)
//         .get("/users")
//         .then(res => {
//           expect(res.status).toBe(200);
//         });
//     });
//   });
// });

describe("GET /", () => {
  it("res.status to be 200", () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  it("up and running message", () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.body).toEqual({ message: "Up and running!" });
      });
  });
});
