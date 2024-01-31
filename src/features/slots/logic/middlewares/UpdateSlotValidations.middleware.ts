import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import logger from "../../../../core/logger";

const middlewares = [
  body("startTime")
    .optional()
    .isObject()
    .withMessage("startTime must be an object")
    .custom((startTime) => {
      if (typeof startTime.hour !== "number") {
        throw new Error("startTime.hour must be a number");
      }
      if (typeof startTime.minute !== "number") {
        throw new Error("startTime.minute must be a number");
      }

      if (startTime.hour < 0 || startTime.hour > 23) {
        throw new Error("startTime.hour must be a number between 0 and 23");
      }

      if (startTime.minute < 0 || startTime.minute > 59) {
        throw new Error("startTime.minute must be a number between 0 and 59");
      }

      return true;
    }),
  body("endTime")
    .optional()
    .isObject()
    .withMessage("endTime must be an object")
    .custom((endTime) => {
      if (typeof endTime.hour !== "number") {
        throw new Error("endTime.hour must be a number");
      }
      if (typeof endTime.minute !== "number") {
        throw new Error("endTime.minute must be a number");
      }

      if (endTime.hour < 0 || endTime.hour > 23) {
        throw new Error("endTime.hour must be a number between 0 and 23");
      }

      if (endTime.minute < 0 || endTime.minute > 59) {
        throw new Error("endTime.minute must be a number between 0 and 59");
      }

      return true;
    }),
  body("day")
    .optional()
    .isInt({ min: 0, max: 6 })
    .withMessage("day must be a number between 0 and 6"),

  //TODO:We need to check if this logic is right
  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating update slot req body: ${JSON.stringify(req.body)}`
    );

    // if the request body contains any field other than "startTime", "endTime", or "day", return an error
    const allowedFields = ["startTime", "endTime", "day"];
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      logger.debug(
        `Invalid update slot req body provided ${JSON.stringify(invalidFields)}`
      );
      return res.status(400).json({
        error: {
          message: `Invalid fields provided: ${invalidFields}`,
        },
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.debug(
        `Invalid update slot req body provided ${JSON.stringify(
          errors.array()
        )}`
      );
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    // If needed, you can perform additional validations or modifications here

    next();
  },
];

const updateSlotValidator = middlewares;
export default updateSlotValidator;
