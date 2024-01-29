import mongoose from "mongoose";
import supertest from "supertest";

import { database, request, expectResponseToBeError } from "..";
import {
  hallModelName,
  HallType,
} from "../../src/features/halls/data/models/halls.model";

describe("/GET /halls", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await database.connect();
  });

  // Disconnect from the database after running all tests
  afterAll(async () => {
    await database.disconnect();
  });

  describe("when the request is invalid", () => {
    describe("when query param 'page' is missing", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get("/halls").query({
          pageSize: 10,
        });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when query param 'page' is not a number", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get("/halls").query({
          page: "abc",
          pageSize: 10,
        });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when query param 'pageSize' is missing", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get("/halls").query({
          page: 1,
        });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when query param 'pageSize' is not a number", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get("/halls").query({
          page: 1,
          pageSize: "abc",
        });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });
  });

  describe("when the request is valid", () => {
    describe("when there are no halls", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get("/halls").query({
          page: 1,
          pageSize: 10,
        });
      });

      it("should return status 200", async () => {
        expect(response.status).toBe(200);
      });

      it("should return an empty array", async () => {
        expect(response.body).toEqual({
          halls: [],
        });
      });
    });

    describe("when there are halls but not enough to fill the page size", () => {
      let response: supertest.Response;

      const halls: HallType[] = [
        {
          name: "Hall 1",
          capacity: 100,
        },
        {
          name: "Hall 2",
          capacity: 200,
        },
      ];

      beforeAll(async () => {
        await database.clear();

        await mongoose.model(hallModelName).create(halls);

        response = await request.get("/halls").query({
          page: 1,
          pageSize: 10,
        });
      });

      it("should return status 200", async () => {
        expect(response.status).toBe(200);
      });

      it("should return the halls", async () => {
        expect(response.body).toEqual({
          halls: [
            {
              _id: expect.any(String),
              name: halls[0].name,
              capacity: halls[0].capacity,
            },
            {
              _id: expect.any(String),
              name: halls[1].name,
              capacity: halls[1].capacity,
            },
          ],
        });
      });
    });

    describe("when there are more halls than the page size", () => {
      let page1Response: supertest.Response;
      let page2Response: supertest.Response;
      let page3Response: supertest.Response;

      const halls: HallType[] = [
        {
          name: "Hall 1",
          capacity: 100,
        },
        {
          name: "Hall 2",
          capacity: 200,
        },
        {
          name: "Hall 3",
          capacity: 300,
        },
        {
          name: "Hall 4",
          capacity: 400,
        },
        {
          name: "Hall 5",
          capacity: 500,
        },
      ];

      const pageSize = 2;

      beforeAll(async () => {
        await database.clear();

        for (const hall of halls) {
          await mongoose.model(hallModelName).create(hall);
        }

        page1Response = await request.get("/halls").query({
          page: 1,
          pageSize,
        });
        page2Response = await request.get("/halls").query({
          page: 2,
          pageSize,
        });
        page3Response = await request.get("/halls").query({
          page: 3,
          pageSize,
        });
      });

      it("should return status 200", async () => {
        expect(page1Response.status).toBe(200);
        expect(page2Response.status).toBe(200);
        expect(page3Response.status).toBe(200);
      });

      it("should return the halls", async () => {
        expect(page1Response.body).toEqual({
          halls: [
            {
              _id: expect.any(String),
              name: halls[0].name,
              capacity: halls[0].capacity,
            },
            {
              _id: expect.any(String),
              name: halls[1].name,
              capacity: halls[1].capacity,
            },
          ],
        });
        expect(page2Response.body).toEqual({
          halls: [
            {
              _id: expect.any(String),
              name: halls[2].name,
              capacity: halls[2].capacity,
            },
            {
              _id: expect.any(String),
              name: halls[3].name,
              capacity: halls[3].capacity,
            },
          ],
        });
        expect(page3Response.body).toEqual({
          halls: [
            {
              _id: expect.any(String),
              name: halls[4].name,
              capacity: halls[4].capacity,
            },
          ],
        });
      });
    });
  });
});
