import mongoose, { mongo } from "mongoose";
import supertest from "supertest";

import { database, request, expectResponseToBeError } from "..";
import {
  hallModelName,
  HallType,
} from "../../src/features/halls/data/models/halls.model";

describe("GET /halls/:id", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await database.connect();
  });

  // Disconnect from the database after running all tests
  afterAll(async () => {
    await database.disconnect();
  });

  describe("when the request is invalid", () => {
    describe("when the id is not a valid ObjectId", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get("/halls/abc");
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the id is not found", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get(
          `/halls/${new mongoose.Types.ObjectId().toHexString()}`
        );
      });

      it("should return status 404", async () => {
        expect(response.status).toBe(404);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
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

      const createdHall = await mongoose
        .model(hallModelName)
        .create(validRequestBody);

      response = await request.get(`/halls/${createdHall._id}`);
    });

    it("should return status 200", async () => {
      expect(response.status).toBe(200);
    });

    it("should return the hall", async () => {
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
