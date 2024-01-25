import { Router } from "express";

import hallRoutes from "./features/example/hall.routes";

const router: Router = Router();

export default (): Router => {
  hallRoutes(router);

  return router;
};
