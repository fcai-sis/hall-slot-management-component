import mongoose from "mongoose";
import supertest from "supertest";

import { database, request, expectResponseToBeError } from "..";
import {
  hallModelName,
  HallType,
} from "../../src/features/halls/data/models/halls.model";

describe("PATCH /halls/:id", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await database.connect();
  });

  // Disconnect from the database after running all tests
  afterAll(async () => {
    await database.disconnect();
  });

  describe("when the request is invalid", () => {
    describe("when the hallId param is missing", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.patch("/halls/");
      });

      it("should return status 404", async () => {
        expect(response.status).toBe(404);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the hallId param is invalid", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.patch("/halls/abc");
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
      it("should return a status of 400", () => {
        expect(response.status).toBe(400);
      });
    });

    describe("when the hall does not exist", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.patch(
          `/halls/${new mongoose.Types.ObjectId()}`
        );
      });

      it("should return status 404", async () => {
        expect(response.status).toBe(404);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    // DATA TYPE CHECK
    describe("when the name data type isn't a string", () => {
      let response: supertest.Response;
      const invalidRequestBody: HallType = {
        // @ts-ignore
        name: 123,
        capacity: 100,
      };
      beforeAll(async () => {
        await database.clear();

        const createdHall = await mongoose.model(hallModelName).create({
          name: "Hall Test",
          capacity: 100,
        });

        response = await request
          .patch(`/halls/${createdHall._id}`)
          .send(invalidRequestBody);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
      it("should return a status of 400", () => {
        expect(response.status).toBe(400);
      });
    });

    describe("when the capacity data type isn't a number", () => {
      let response: supertest.Response;
      const invalidRequestBody: HallType = {
        name: "Hall Test",
        // @ts-ignore
        capacity: "abc",
      };
      beforeAll(async () => {
        await database.clear();

        const createdHall = await mongoose.model(hallModelName).create({
          name: "Hall Test",
          capacity: 100,
        });

        response = await request
          .patch(`/halls/${createdHall._id}`)
          .send(invalidRequestBody);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
      it("should return a status of 400", () => {
        expect(response.status).toBe(400);
      });
    });

    // INVALID REQUEST BODY

    describe("when the request body contains fields other than name and capacity", () => {
      let response: supertest.Response;
      const invalidRequestBody: HallType = {
        name: "Hall Test",
        capacity: 100,
        // @ts-ignore
        invalidField: "abc",
      };
      beforeAll(async () => {
        await database.clear();

        const createdHall = await mongoose.model(hallModelName).create({
          name: "Hall Test",
          capacity: 100,
        });

        response = await request
          .patch(`/halls/${createdHall._id}`)
          .send(invalidRequestBody);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
      it("should return a status of 400", () => {
        expect(response.status).toBe(400);
      });
    });
  });

  describe("when the request is valid", () => {
    let response: supertest.Response;
    const validRequestBody: HallType = {
      name: "Hall Test",
      capacity: 100,
    };

    beforeAll(async () => {
      await database.clear();

      const createdHall = await mongoose.model(hallModelName).create({
        name: "Hall 1",
        capacity: 10,
      });

      response = await request
        .patch(`/halls/${createdHall._id}`)
        .send(validRequestBody);
    });

    it("should return status 200", async () => {
      expect(response.status).toBe(200);
    });

    it("should return the updated hall", async () => {
      expect(response.body).toEqual({
        hall: {
          _id: expect.any(String),
          name: validRequestBody.name,
          capacity: validRequestBody.capacity,
        },
      });
    });
  });
});
