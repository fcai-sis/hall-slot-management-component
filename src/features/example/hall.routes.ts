import { Router } from "express";

import asyncHandler from "../../core/asyncHandler";
import validateExampleMessageMiddleware from "./logic/middlewares/validateExampleMessage.middleware";
import createHallsHandler from "./logic/handlers/create.hall.handler";
import getAllHallsHandler from "./logic/handlers/get.all.hall.handler";
import getHallByIdHandler from "./logic/handlers/get.hall.by.id.handler";
import updateHallByIdHandler from "./logic/handlers/update.hall.by.id.handler";
import deleteHallByIdHandler from "./logic/handlers/delete.hall.by.id.handler";

export default (router: Router) => {
  router.post(
    "/halls",

    // Validate example message
    //validateExampleMessageMiddleware,

    // Handle example request
    asyncHandler(createHallsHandler)
  );

  router.get(
    "/halls",

    // Handle example request
    asyncHandler(getAllHallsHandler)
  );

  router.get(
    "/halls/:id",

    // Handle example request
    asyncHandler(getHallByIdHandler)
  );

  router.put(
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
