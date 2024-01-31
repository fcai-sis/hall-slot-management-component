import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import createSlotsHandler from "./logic/handlers/create.slot.handler";
import getAllSlotsHandler from "./logic/handlers/get.all.slot.handler";
import getSlotByIdHandler from "./logic/handlers/get.slot.by.id.handler";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";
import updateSlotByIdHandler from "./logic/handlers/update.slot.by.id.handler";
import deleteSlotByIdHandler from "./logic/handlers/delete.slot.by.id.handler";
import ensureSlotIdInParamsMiddleware from "./logic/middlewares/EnsureSlotidparam.middleware";
import updateSlotValidator from "./logic/middlewares/UpdateSlotValidations.middleware";
import createSlotValidator from "./logic/middlewares/validateCreateSlotRequestBody.middleware";

export default (router: Router) => {
  /*
   * Create new slot
   **/
  router.post(
    "/slots",

    // Validate example message

    createSlotValidator,

    // Handle example request
    asyncHandler(createSlotsHandler)
  );

  /*
   * Get all slots
   **/
  router.get(
    "/slots",

    // Validate pagination query params
    paginationQueryParamsMiddleware,

    // Handle example request
    asyncHandler(getAllSlotsHandler)
  );

  /*
   * Get slot by id
   **/
  router.get(
    "/slots/:id",

    ensureSlotIdInParamsMiddleware,

    // Handle example request
    asyncHandler(getSlotByIdHandler)
  );

  /*
   * Update slot by id
   **/
  router.patch(
    "/slots/:id",

    ensureSlotIdInParamsMiddleware,

    updateSlotValidator,

    // Handle example request
    asyncHandler(updateSlotByIdHandler)
  );

  /*
   * Delete slot by id
   **/
  router.delete(
    "/slots/:id",

    ensureSlotIdInParamsMiddleware,

    // Handle example request
    asyncHandler(deleteSlotByIdHandler)
  );
};
