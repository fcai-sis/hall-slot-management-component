import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import createSlotsHandler from "./logic/handlers/createSlot.handler";
import getAllSlotsHandler from "./logic/handlers/get.all.slot.handler";
import getSlotByIdHandler from "./logic/handlers/get.slot.by.id.handler";
import updateSlotByIdHandler from "./logic/handlers/update.slot.by.id.handler";
import deleteSlotByIdHandler from "./logic/handlers/delete.slot.by.id.handler";
import ensureSlotIdInParamsMiddleware from "./logic/middlewares/EnsureSlotidparam.middleware";
import updateSlotValidator from "./logic/middlewares/UpdateSlotValidations.middleware";
import validateCreateSlotRequestMiddleware from "./logic/middlewares/validateCreateSlotRequestBody.middleware";

const slotsRoutes = (router: Router) => {
  /*
   * Create new slot
   **/
  router.post(
    "/",
    validateCreateSlotRequestMiddleware,
    asyncHandler(createSlotsHandler)
  );

  /*
   * Get all slots
   **/
  router.get("/", asyncHandler(getAllSlotsHandler));

  /*
   * Get slot by id
   **/
  router.get(
    "/:id",
    ensureSlotIdInParamsMiddleware,
    asyncHandler(getSlotByIdHandler)
  );

  /*
   * Update slot by id
   **/
  router.patch(
    "/:id",

    ensureSlotIdInParamsMiddleware,

    updateSlotValidator,

    // Handle example request
    asyncHandler(updateSlotByIdHandler)
  );

  /*
   * Delete slot by id
   **/
  router.delete(
    "/:id",

    ensureSlotIdInParamsMiddleware,

    // Handle example request
    asyncHandler(deleteSlotByIdHandler)
  );
};

export default slotsRoutes;
