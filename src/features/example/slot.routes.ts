import { Router } from "express";

import asyncHandler from "../../core/asyncHandler";
import { validateSlotData } from "./logic/middlewares/validateSlotData.middleware";
import createSlotsHandler from "./logic/handlers/create.slot.handler";
import getAllSlotsHandler from "./logic/handlers/get.all.slot.handler";
import getSlotByIdHandler from "./logic/handlers/get.slot.by.id.handler";
import UpdateSlotByIdHandler from "./logic/handlers/update.slot.by.id.handler";
import deleteSlotByIdHandler from "./logic/handlers/delete.slot.by.id.handler";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";

export default (router: Router) => {
  router.post(
    "/slots",

    // Validate example message
    validateSlotData,

    // Handle example request
    asyncHandler(createSlotsHandler)
  );

  router.get(
    "/slots",

    // Validate pagination query params
    paginationQueryParamsMiddleware,

    // Handle example request
    asyncHandler(getAllSlotsHandler)
  );

  router.get(
    "/slots/:id",

    // Handle example request
    asyncHandler(getSlotByIdHandler)
  );

  router.patch(
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
