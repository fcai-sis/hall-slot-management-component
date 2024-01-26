import { Router } from "express";

import hallRoutes from "./features/example/hall.routes";
import slotRoutes from "features/example/slot.routes";

const router: Router = Router();

export default (): Router => {
  hallRoutes(router);

  slotRoutes(router);

  return router;
};
