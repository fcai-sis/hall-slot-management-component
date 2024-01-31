import mongoose from "mongoose";
import supertest from "supertest";

import {
  database,
  request,
  expectHallCollectionToBeEmpty,
  expectResponseToBeError,
} from "..";
import {
  hallModelName,
  HallType,
} from "../../src/features/halls/data/models/halls.model";

describe("POST /halls", () => {
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
    const validRequestBody: HallType = {
      name: "Hall Test",
      capacity: 100,
    };

    beforeAll(async () => {
      // Clear the database before all tests
      await database.clear();
      // Send a POST request with the valid request body
      response = await request.post("/halls").send(validRequestBody);
      // Ensure that it was created in the database
      const hallCreated = await mongoose.model(hallModelName).exists({
        _id: response.body.hall._id,
        ...validRequestBody,
      });

      expect(hallCreated).toBeTruthy();
    });

    it("should return 201", async () => {
      expect(response.status).toBe(201);
    });

    it("should return the created hall", () => {
      expect(response.body).toEqual({
        hall: {
          _id: expect.any(String),
          name: validRequestBody.name,
          capacity: validRequestBody.capacity,
        },
      });
    });

    it("should create a hall in the database", async () => {
      const hallCreated = await mongoose.model(hallModelName).exists({
        _id: response.body.hall._id,
        ...validRequestBody,
      });

      expect(hallCreated).toBeTruthy();
    });
  });

  describe("when the request is invalid", () => {
    describe("when the name is missing", () => {
      // Define a variable to store the response
      let response: supertest.Response;
      // Define an invalid request body
      const invalidRequestBody = {
        capacity: 100,
      };

      beforeAll(async () => {
        // Clear the database before all tests
        await database.clear();
        // Send a POST request with the invalid request body
        response = await request.post("/halls").send(invalidRequestBody);
      });

      it("should return 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });

      it("should not create a hall in the database", async () => {
        await expectHallCollectionToBeEmpty();
      });
    });

    describe("when the name is not a string", () => {
      // Define a variable to store the response
      let response: supertest.Response;
      // Define an invalid request body
      const invalidRequestBody = {
        name: 123,
        capacity: 100,
      };

      beforeAll(async () => {
        // Clear the database before all tests
        await database.clear();
        // Send a POST request with the invalid request body
        response = await request.post("/halls").send(invalidRequestBody);
      });

      it("should return 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });

      it("should not create a hall in the database", async () => {
        await expectHallCollectionToBeEmpty();
      });
    });

    describe("when the capacity is missing", () => {
      // Define a variable to store the response
      let response: supertest.Response;
      // Define an invalid request body
      const invalidRequestBody = {
        name: "Hall Test",
      };

      beforeAll(async () => {
        // Clear the database before all tests
        await database.clear();
        // Send a POST request with the invalid request body
        response = await request.post("/halls").send(invalidRequestBody);
      });

      it("should return 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });

      it("should not create a hall in the database", async () => {
        await expectHallCollectionToBeEmpty();
      });
    });

    describe("when the capacity is not a number", () => {
      // Define a variable to store the response
      let response: supertest.Response;
      // Define an invalid request body
      const invalidRequestBody = {
        name: "Hall Test",
        capacity: "abc",
      };

      beforeAll(async () => {
        // Clear the database before all tests
        await database.clear();
        // Send a POST request with the invalid request body
        response = await request.post("/halls").send(invalidRequestBody);
      });

      it("should return 400", async () => {
        expect(response.status).toBe(400);
      });

      it("should return an error response", () => {
        expectResponseToBeError(response);
      });

      it("should not create a hall in the database", async () => {
        await expectHallCollectionToBeEmpty();
      });
    });
  });
});
