import mongoose from "mongoose";
import supertest from "supertest";

import { database, request, expectResponseToBeError } from "..";
import {
  hallModelName,
  HallType,
} from "../../src/features/halls/data/models/halls.model";

describe("DELETE /halls/:id", () => {
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

        response = await request.delete("/halls/");
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

        response = await request.delete("/halls/abc");
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

        await mongoose.model(hallModelName).create({
          _id: new mongoose.Types.ObjectId(),
          name: "Hall Test",
          capacity: 100,
        });

        response = await request.delete(
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
  });

  describe("when the request is valid", () => {
    let response: supertest.Response;
    let hallId: string;

    beforeAll(async () => {
      await database.clear();

      const createdHall = await mongoose.model(hallModelName).create({
        name: "name",
        capacity: 100,
      } as HallType);

      hallId = createdHall._id.toString();

      response = await request.delete(`/halls/${hallId}`);
    });

    it("should return status 200", async () => {
      expect(response.status).toBe(200);
    });

    it("should delete the hall from the database", async () => {
      const hallDeleted = await mongoose
        .model(hallModelName)
        .exists({ _id: hallId });

      expect(hallDeleted).toBeFalsy();
    });
  });
});
