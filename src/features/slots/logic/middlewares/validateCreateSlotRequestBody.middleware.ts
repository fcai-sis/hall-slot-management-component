import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import logger from "../../../../core/logger";

const middlewares = [
  body("startTime")
    .exists()
    .withMessage("startTime is required")
    .isObject()
    .withMessage("startTime must be an object")
    .custom((startTime) => {
      if (!startTime.hour) {
        throw new Error("startTime.hour is required");
      }
      if (!startTime.minute) {
        throw new Error("startTime.minute is required");
      }
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
    .exists()
    .withMessage("endTime is required")
    .isObject()
    .withMessage("endTime must be an object")
    .custom((endTime) => {
      if (!endTime.hour) {
        throw new Error("endTime.hour is required");
      }
      if (!endTime.minute) {
        throw new Error("endTime.minute is required");
      }
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
    .exists()
    .withMessage("day is required")
    .isInt({ min: 0, max: 6 })
    .withMessage("day must be a number between 0 and 6"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating create slot req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.debug(
        `Invalid create slot req body provided ${JSON.stringify(
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

const createSlotValidator = middlewares;
export default createSlotValidator;
