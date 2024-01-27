import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const middlewares = [
  // Validation middleware using express-validator for hallId
  body("name")
    .exists()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a valid String"),

  body("capacity")
    .exists()
    .withMessage("capacity is required")
    .isInt({ gt: 0 })
    .withMessage("capacity must be a valid Integer"),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    // Trim the name if needed
    req.body.name = req.body.name.trim();

    // Proceed to the next middleware or route handler
    next();
  },
];

const validateHallData = middlewares;
export default validateHallData;
