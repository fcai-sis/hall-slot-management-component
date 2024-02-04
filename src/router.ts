import { Router } from "express";

import hallsRoutes from "./features/halls/hall.routes";
import slotsRoutes from "./features/slots/slot.routes";

export const hallsRouter = (): Router => {
  const router = Router();
  hallsRoutes(router);
  return router;
};

export const slotsRouter = (): Router => {
  const router = Router();
  slotsRoutes(router);
  return router;
};
