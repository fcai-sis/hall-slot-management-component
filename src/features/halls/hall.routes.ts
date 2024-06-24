import { Router } from "express";
import paginate from "express-paginate";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import createHallsHandler from "./logic/handlers/createHall.handler";
import getAllHallsHandler from "./logic/handlers/get.all.hall.handler";
import getHallByIdHandler from "./logic/handlers/get.hall.by.id.handler";
import updateHallByIdHandler from "./logic/handlers/update.hall.by.id.handler";
import deleteHallByIdHandler from "./logic/handlers/delete.hall.by.id.handler";

import ensureHallIdInParamsMiddleware from "./logic/middlewares/ensureHallIdInParams.middleware";
import updateHallValidator from "./logic/middlewares/UpdateHallValidations.middleware";
import validateCreateHallRequestMiddleware from "./logic/middlewares/validateCreateHallRequestBody.middleware";

const hallsRoutes = (router: Router) => {
  /*
   * Create new hall
   **/
  router.post(
    "/",
    validateCreateHallRequestMiddleware,
    asyncHandler(createHallsHandler)
  );

  /*
   * Get all halls
   **/
  router.get("/read", paginate.middleware(), asyncHandler(getAllHallsHandler));

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

export default hallsRoutes;
