import { Router } from "express";

import asyncHandler from "../../core/asyncHandler";
import { validateHallData } from "./logic/middlewares/validateHallData.middleware";
import createHallsHandler from "./logic/handlers/create.hall.handler";
import getAllHallsHandler from "./logic/handlers/get.all.hall.handler";
import getHallByIdHandler from "./logic/handlers/get.hall.by.id.handler";
import updateHallByIdHandler from "./logic/handlers/update.hall.by.id.handler";
import deleteHallByIdHandler from "./logic/handlers/delete.hall.by.id.handler";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";

export default (router: Router) => {
  router.post(
    "/halls",

    // Validate example message
    validateHallData,

    // Handle example request
    asyncHandler(createHallsHandler)
  );

  router.get(
    "/halls",

    // Validate pagination query params
    paginationQueryParamsMiddleware,

    // Handle example request
    asyncHandler(getAllHallsHandler)
  );

  router.get(
    "/halls/:id",

    // Handle example request
    asyncHandler(getHallByIdHandler)
  );

  router.patch(
    "/halls/:id",

    // Handle example request
    asyncHandler(updateHallByIdHandler)
  );

  router.delete(
    "/halls/:id",

    // Handle example request
    asyncHandler(deleteHallByIdHandler)
  );
};
