import mongoose from "mongoose";
import supertest from "supertest";

import { database, request, expectResponseToBeError } from "..";
import {
  slotModelName,
  SlotType,
} from "../../src/features/slots/data/models/slot.model";

describe("GET /slots/:id", () => {
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

        response = await request.get("/slots/abc");
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
          `/slots/${new mongoose.Types.ObjectId().toHexString()}`
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
    const validRequestBody: SlotType = {
      startTime: {
        hour: 1,
        minute: 2,
      },
      endTime: {
        hour: 3,
        minute: 4,
      },
      day: 5,
    };

    beforeAll(async () => {
      await database.clear();

      const createdSlot = await mongoose
        .model(slotModelName)
        .create(validRequestBody);

      response = await request.get(`/slots/${createdSlot._id}`);
    });

    it("should return status 200", async () => {
      expect(response.status).toBe(200);
    });

    it("should return the slot", async () => {
      expect(response.body).toEqual({
        slot: {
          _id: expect.any(String),
          ...validRequestBody,
        },
      });
    });
  });
});
