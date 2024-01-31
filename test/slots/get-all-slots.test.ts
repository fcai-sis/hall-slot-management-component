import mongoose from "mongoose";
import supertest from "supertest";

import {
  database,
  request,

  expectResponseToBeError,
} from "..";
import {
  slotModelName,
  SlotType,
} from "../../src/features/slots/data/models/slot.model";

describe("GET /slots", () => {
  beforeAll(async () => {
    await database.connect();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  describe("when the request is invalid", () => {
    describe("when query param 'page' is missing", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get("/slots").query({
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

        response = await request.get("/slots").query({
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

        response = await request.get("/slots").query({
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

        response = await request.get("/slots").query({
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
    describe("when there are no slots", () => {
      let response: supertest.Response;

      beforeAll(async () => {
        await database.clear();

        response = await request.get("/slots").query({
          page: 1,
          pageSize: 10,
        });
      });

      it("should return status 200", async () => {
        expect(response.status).toBe(200);
      });

      it("should return an empty array", async () => {
        expect(response.body).toEqual({
          slots: [],
        });
      });
    });

    describe("when there are slots but not enough to fill the page size", () => {
      let response: supertest.Response;

      const slots: SlotType[] = [
        {
          startTime: {
            hour: 1,
            minute: 2,
          },
          endTime: {
            hour: 3,
            minute: 4,
          },
          day: 5,
        },
        {
          startTime: {
            hour: 6,
            minute: 7,
          },
          endTime: {
            hour: 8,
            minute: 9,
          },
          day: 1,
        },
      ];

      beforeAll(async () => {
        await database.clear();

        await mongoose.model(slotModelName).create(slots);

        response = await request.get("/slots").query({
          page: 1,
          pageSize: 10,
        });
      });

      it("should return status 200", async () => {
        expect(response.status).toBe(200);
      });

      it("should return the slots", async () => {
        expect(response.body).toEqual({
          slots: [
            {
              _id: expect.any(String),
              ...slots[0],
            },
            {
              _id: expect.any(String),
              ...slots[1],
            },
          ],
        });
      });
    });

    describe("when there are more slots than the page size", () => {
      let page1Response: supertest.Response;
      let page2Response: supertest.Response;
      let page3Response: supertest.Response;

      const slots: SlotType[] = [
        {
          startTime: {
            hour: 1,
            minute: 2,
          },
          endTime: {
            hour: 3,
            minute: 4,
          },
          day: 5,
        },
        {
          startTime: {
            hour: 6,
            minute: 7,
          },
          endTime: {
            hour: 8,
            minute: 9,
          },
          day: 1,
        },
        {
          startTime: {
            hour: 12,
            minute: 7,
          },
          endTime: {
            hour: 14,
            minute: 10,
          },
          day: 3,
        },
        {
          startTime: {
            hour: 20,
            minute: 7,
          },
          endTime: {
            hour: 2,
            minute: 9,
          },
          day: 4,
        },
        {
          startTime: {
            hour: 22,
            minute: 2,
          },
          endTime: {
            hour: 23,
            minute: 4,
          },
          day: 6,
        },
      ];

      const pageSize = 2;

      beforeAll(async () => {
        await database.clear();

        for (const slot of slots) {
          await mongoose.model(slotModelName).create(slot);
        }

        page1Response = await request.get("/slots").query({
          page: 1,
          pageSize,
        });
        page2Response = await request.get("/slots").query({
          page: 2,
          pageSize,
        });
        page3Response = await request.get("/slots").query({
          page: 3,
          pageSize,
        });
      });

      it("should return status 200", async () => {
        expect(page1Response.status).toBe(200);
        expect(page2Response.status).toBe(200);
        expect(page3Response.status).toBe(200);
      });

      it("should return the slots", async () => {
        expect(page1Response.body).toEqual({
          slots: [
            {
              _id: expect.any(String),
              ...slots[0],
            },
            {
              _id: expect.any(String),
              ...slots[1],
            },
          ],
        });
        expect(page2Response.body).toEqual({
          slots: [
            {
              _id: expect.any(String),
              ...slots[2],
            },
            {
              _id: expect.any(String),
              ...slots[3],
            },
          ],
        });
        expect(page3Response.body).toEqual({
          slots: [
            {
              _id: expect.any(String),
              ...slots[4],
            },
          ],
        });
      });
    });
  });
});
