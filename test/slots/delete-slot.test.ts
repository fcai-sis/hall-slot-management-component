import mongoose from "mongoose";
import supertest from "supertest";

import {
  database,
  request,
  expectSlotCollectionToBeEmpty,
  expectResponseToBeError,
} from "..";
import {
  slotModelName,
  SlotType,
} from "../../src/features/slots/data/models/slot.model";

describe("DELETE /slots/:id", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await database.connect();
  });

  // Disconnect from the database after running all tests
  afterAll(async () => {
    await database.disconnect();
  });

  describe("when the request is invalid", () => {
    describe("when the slotId param is missing", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.delete(`/slots/`);
      });

      it("should return status 404", async () => {
        expect(response.status).toBe(404);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the slotId param is invalid", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.delete(`/slots/abc`);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
      it("should return a status of 400", () => {
        expect(response.status).toBe(400);
      });
    });

    describe("when the slot does not exist", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.delete(
          `/slots/${new mongoose.Types.ObjectId()}`
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
    let slotId: string;

    beforeAll(async () => {
      await database.clear();

      const createdSlot = await mongoose.model(slotModelName).create({
        startTime: {
          hour: 2,
          minute: 2,
        },
        endTime: {
          hour: 2,
          minute: 2,
        },
        day: 2,
      } as SlotType);

      slotId = createdSlot._id.toString();

      response = await request.delete(`/slots/${slotId}`);
    });

    it("should return status 200", async () => {
      expect(response.status).toBe(200);
    });

    it("should delete the slot from the database", async () => {
      const slotDeleted = await mongoose
        .model(slotModelName)
        .exists({ _id: slotId });

      expect(slotDeleted).toBeFalsy();
    });
  });
});
