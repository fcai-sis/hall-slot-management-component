import mongoose from "mongoose";
import supertest from "supertest";

import { database, request, expectResponseToBeError } from "..";
import {
  slotModelName,
  SlotType,
} from "../../src/features/slots/data/models/slot.model";

describe("PATCH /slots/:id", () => {
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

        response = await request.patch("/slots/");
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

        response = await request.patch("/slots/abc");
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

        response = await request.patch(
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

    //DATA TYPE CHECK

    describe("when the startTime is not an object containing hour and minute", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request
          .patch(`/slots/${new mongoose.Types.ObjectId()}`)
          .send({
            startTime: "abc",
            endTime: {
              hour: 1,
              minute: 1,
            },
            day: 1,
          });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the startTime.hour is not a number", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request
          .patch(`/slots/${new mongoose.Types.ObjectId()}`)
          .send({
            startTime: {
              hour: "abc",
              minute: 1,
            },
            endTime: {
              hour: 1,
              minute: 1,
            },
            day: 1,
          });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the startTime.minute is not a number", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request
          .patch(`/slots/${new mongoose.Types.ObjectId()}`)
          .send({
            startTime: {
              hour: 1,
              minute: "abc",
            },
            endTime: {
              hour: 1,
              minute: 1,
            },
            day: 1,
          });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });
    describe("when the endTime is not an object containing hour and minute", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request
          .patch(`/slots/${new mongoose.Types.ObjectId()}`)
          .send({
            startTime: {
              hour: 1,
              minute: 1,
            },
            endTime: "abc",
            day: 1,
          });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });
      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the endTime.hour is not a number", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request
          .patch(`/slots/${new mongoose.Types.ObjectId()}`)
          .send({
            startTime: {
              hour: 1,
              minute: 1,
            },
            endTime: {
              hour: "abc",
              minute: 1,
            },
            day: 1,
          });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });
      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the endTime.minute is not a number", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request
          .patch(`/slots/${new mongoose.Types.ObjectId()}`)
          .send({
            startTime: {
              hour: 1,
              minute: 1,
            },
            endTime: {
              hour: 1,
              minute: "abc",
            },
            day: 1,
          });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });
      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the day is not a number", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request
          .patch(`/slots/${new mongoose.Types.ObjectId()}`)
          .send({
            startTime: {
              hour: 1,
              minute: 1,
            },
            endTime: {
              hour: 1,
              minute: 1,
            },
            day: "abc",
          });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });
      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    // INVALID REQUEST BODY

    describe("when the request contains fields other than startTime, endTime and day", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request
          .patch(`/slots/${new mongoose.Types.ObjectId()}`)
          .send({
            startTime: {
              hour: 1,
              minute: 1,
            },
            endTime: {
              hour: 1,
              minute: 1,
            },
            day: 1,
            // @ts-ignore
            invalidField: "abc",
          });
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
    const validRequestBody: SlotType = {
      startTime: {
        hour: 2,
        minute: 2,
      },
      endTime: {
        hour: 2,
        minute: 2,
      },
      day: 2,
    };

    beforeAll(async () => {
      await database.clear();

      const createdSlot = await mongoose.model(slotModelName).create({
        startTime: {
          hour: 1,
          minute: 1,
        },
        endTime: {
          hour: 1,
          minute: 1,
        },
        day: 1,
      });

      response = await request
        .patch(`/slots/${createdSlot._id}`)
        .send(validRequestBody);
    });

    it("should return status 200", async () => {
      expect(response.status).toBe(200);
    });

    it("should return the updated slots", async () => {
      expect(response.body).toEqual({
        slot: {
          _id: expect.any(String),
          ...validRequestBody,
        },
      });
    });
  });
  
});
