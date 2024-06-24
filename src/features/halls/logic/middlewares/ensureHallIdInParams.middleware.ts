import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import { param } from "express-validator";

const ensureHallIdInParamsMiddleware = [
  param("id")
    .exists()
    .withMessage("Hall ID is required")

    .isMongoId()
    .withMessage("Hall ID must be a valid Mongo ID"),

  validateRequestMiddleware,
];

export default ensureHallIdInParamsMiddleware;
