import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import createHallsHandler from "./logic/handlers/create.hall.handler";
import getAllHallsHandler from "./logic/handlers/get.all.hall.handler";
import getHallByIdHandler from "./logic/handlers/get.hall.by.id.handler";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";
import updateHallByIdHandler from "./logic/handlers/update.hall.by.id.handler";
import deleteHallByIdHandler from "./logic/handlers/delete.hall.by.id.handler";

import ensureHallIdInParamsMiddleware from "./logic/middlewares/EnsureHallidparam.middleware";
import updateHallValidator from "./logic/middlewares/UpdateHallValidations.middleware";
import validateCreateHall from "./logic/middlewares/validateCreateHallRequestBody.middleware";

export default (router: Router) => {
  /*
   * Create new hall
   **/
  router.post(
    "/halls",

    validateCreateHall,

    asyncHandler(createHallsHandler)
  );

  /*
   * Get all halls
   **/
  router.get(
    "/halls",

    // Validate pagination query params
    paginationQueryParamsMiddleware,

    // Handle example request
    asyncHandler(getAllHallsHandler)
  );

  /*
   * Get hall by id
   **/
  router.get(
    "/halls/:id",

    ensureHallIdInParamsMiddleware,
    // Handle example request
    asyncHandler(getHallByIdHandler)
  );

  /*
   * Update hall by id
   **/
  router.patch(
    "/halls/:id",

    ensureHallIdInParamsMiddleware,

    updateHallValidator,

    // Handle example request
    asyncHandler(updateHallByIdHandler)
  );

  /*
   * Delete hall by id
   **/
  router.delete(
    "/halls/:id",

    ensureHallIdInParamsMiddleware,

    // Handle example request
    asyncHandler(deleteHallByIdHandler)
  );
};
