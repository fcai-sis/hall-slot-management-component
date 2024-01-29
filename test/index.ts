import mongoose from "mongoose";
import supertest from "supertest";

import app from "../src/app";
import { hallModelName } from "../src/features/halls/data/models/halls.model";
import { slotModelName } from "../src/features/slots/data/models/slot.model";

export * as database from "./database";
export const request = supertest(app);

export async function expectHallCollectionToBeEmpty() {
  const announcementsCount = await mongoose
    .model(hallModelName)
    .countDocuments();

  expect(announcementsCount).toBe(0);
}

export async function expectSlotCollectionToBeEmpty() {
  const slotsCount = await mongoose.model(slotModelName).countDocuments();

  expect(slotsCount).toBe(0);
}

export function expectResponseToBeError(response: supertest.Response) {
  expect(response.body).toEqual({
    error: {
      message: expect.any(String),
    },
  });
}
