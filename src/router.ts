import { Router } from "express";

import hallRoutes from "./features/halls/hall.routes";
import slotRoutes from "./features/slots/slot.routes";

const router: Router = Router();

export default (): Router => {
  hallRoutes(router);
  slotRoutes(router);

  return router;
};
