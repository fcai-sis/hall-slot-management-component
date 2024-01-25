import { Router } from "express";

import asyncHandler from "../../core/asyncHandler";
import { ValidateHallData } from "./logic/middlewares/validateHallData.middleware";
import createSlotsHandler from "./logic/handlers/create.slot.handler";
import getAllSlotsHandler from "./logic/handlers/get.all.slot.handler";
import getSlotByIdHandler from "./logic/handlers/get.slot.by.id.handler";
import UpdateSlotByIdHandler from "./logic/handlers/update.slot.by.id.handler";
import deleteSlotByIdHandler from "./logic/handlers/delete.slot.by.id.handler";

export default (router: Router) => {
  router.post(
    "/slots",

    // Validate example message
    ValidateHallData,

    // Handle example request
    asyncHandler(createSlotsHandler)
  );

  router.get(
    "/slots",

    // Handle example request
    asyncHandler(getAllSlotsHandler)
  );

  router.get(
    "/slots/:id",

    // Handle example request
    asyncHandler(getSlotByIdHandler)
  );

  router.put(
    "/slots/:id",

    // Handle example request
    asyncHandler(UpdateSlotByIdHandler)
  );

  router.delete(
    "/slots/:id",

    // Handle example request
    asyncHandler(deleteSlotByIdHandler)
  );
};
