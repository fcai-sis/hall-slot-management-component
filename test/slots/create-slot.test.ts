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

describe("POST /slots", () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await database.connect();
  });

  // Disconnect from the database after running all tests
  afterAll(async () => {
    await database.disconnect();
  });

  describe("when the request is valid", () => {
    // Define a variable to store the response
    let response: supertest.Response;
    // Define a valid request body
    const validRequestBody: SlotType = {
      startTime: {
        hour: 3,
        minute: 10,
      },
      endTime: {
        hour: 2,
        minute: 30,
      },
      day: 2,
    };

    beforeAll(async () => {
      await database.clear();
      response = await request.post("/slots").send(validRequestBody);
      const slotCreated = await mongoose.model(slotModelName).exists({
        _id: response.body.slot._id,
        ...validRequestBody,
      });

      expect(slotCreated).toBeTruthy();
    });
    it("should return status code 201", () => {
      expect(response.status).toBe(201);
    });

    it("should return the created slot", () => {
      expect(response.body.slot).toEqual({
        _id: expect.any(String),
        ...validRequestBody,
      });
    });
  });

  describe("when the request is invalid", () => {
    describe("when the startTime is missing", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request.post("/slots").send({
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

    describe("when the startTime is invalid", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request.post("/slots").send({
          startTime: {
            hour: 25,
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

    describe("when the startTime.hour is not a number", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request.post("/slots").send({
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

    describe("when the endTime is missing", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request.post("/slots").send({
          startTime: {
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

    describe("when the endTime is invalid", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request.post("/slots").send({
          startTime: {
            hour: 1,
            minute: 1,
          },
          endTime: {
            hour: 25,
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

    describe("when the endTime is not a number", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request.post("/slots").send({
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

    describe("when the day is missing", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request.post("/slots").send({
          startTime: {
            hour: 1,
            minute: 1,
          },
          endTime: {
            hour: 1,
            minute: 1,
          },
        });
      });

      it("should return status 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error message", async () => {
        expectResponseToBeError(response);
      });
    });

    describe("when the day is invalid", () => {
      let response: supertest.Response;
      beforeAll(async () => {
        await database.clear();
        response = await request.post("/slots").send({
          startTime: {
            hour: 1,
            minute: 1,
          },
          endTime: {
            hour: 1,
            minute: 1,
          },
          day: 8,
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
        response = await request.post("/slots").send({
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
  });
});
