import * as validator from "express-validator";

import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import { DayEnum } from "@fcai-sis/shared-models";

const validateCreateSlotRequestMiddleware = [
  validator
    .body("slot.start")

    .exists()
    .withMessage("start is required")

    .isObject()
    .withMessage("start must be an object"),

  validator
    .body("slot.start.hour")

    .exists()
    .withMessage("start.hour is required")

    .isInt({ min: 0, max: 23 })
    .withMessage("start.hour must be a number between 0 and 23"),

  validator
    .body("slot.start.minute")

    .exists()
    .withMessage("start.minute is required")

    .isInt({ min: 0, max: 59 })
    .withMessage("start.minute must be a number between 0 and 59"),

  validator
    .body("slot.end")

    .exists()
    .withMessage("end is required")

    .isObject()
    .withMessage("end must be an object"),

  validator
    .body("slot.end.hour")

    .exists()
    .withMessage("end.hour is required")

    .isInt({ min: 0, max: 23 })
    .withMessage("end.hour must be a number between 0 and 23"),

  validator
    .body("slot.end.minute")

    .exists()
    .withMessage("end.minute is required")

    .isInt({ min: 0, max: 59 })
    .withMessage("end.minute must be a number between 0 and 59"),

  validator
    .body("slot.day")

    .exists()
    .withMessage("day is required")

    .isIn(DayEnum)
    .withMessage(
      `day must be one of the following values: ${DayEnum.join(", ")}`
    ),

  validateRequestMiddleware,
];

export default validateCreateSlotRequestMiddleware;
