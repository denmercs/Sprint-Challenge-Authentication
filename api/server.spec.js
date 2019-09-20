const request = require("supertest");

const server = require("./server");

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

describe("GET /api/jokes", () => {
  it("returns JSON", done => {
    request(server)
      .get("/api/jokes")
      .then(res => {
        expect(res.type).toMatch(/json/i);
        done();
      });
  });

  it("authorization login", () => {
    return request(server)
      .get("/api/jokes")
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("no credentials provided");
      });
  });
});
