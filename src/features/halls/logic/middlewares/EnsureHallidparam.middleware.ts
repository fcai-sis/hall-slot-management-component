import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";

const middlewares = [
  // Validation middleware using express-validator for hallId
  param("id")
    .exists()
    .withMessage("Hall ID is required")
    .isMongoId()
    .withMessage("Hall ID must be a valid Mongo ID"),

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

    // Trim the hallId if needed
    req.params.id = req.params.id.trim();

    // Proceed to the next middleware or route handler
    next();
  },
];

const ensureHallIdInParamsMiddleware = middlewares;
export default ensureHallIdInParamsMiddleware;
