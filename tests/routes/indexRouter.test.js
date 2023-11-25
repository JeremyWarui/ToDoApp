//  test file for the indexRouter
import { expect } from "chai";
import request from "request";
import { describe, it } from "mocha";
import test_data from "../data/tasks.test.json" assert { type: "json" };
import bodyParser from "body-parser";

const endpoint = "http://localhost:4000/all";

describe("statusCode", () => {
  beforeEach(async () => {
    await request(endpoint);
  });
  describe("return right status code", () => {
    it("should return right status code", () => {
      request(endpoint, (err, res, body) => {
        expect(res.statusCode).to.deep.equal(200);
      });
    });
  });
  describe("return right format", () => {
    it("should return right format", () => {
      request(endpoint, (err, res, body) => {
        // const content = JSON.parse(body)
        // expect(Array.isArray(res)).to.be.true;
        expect(body).to.deep.equal(test_data.tasks);
      });
    });
  });
});
