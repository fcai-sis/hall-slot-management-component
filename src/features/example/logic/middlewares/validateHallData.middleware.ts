import { NextFunction, Request, Response } from "express";

export const ValidateHallData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, capacity } = req.params;

  if (!name || !capacity) {
    return res.status(400).json({
      message: "Invalid Hall Data",
    });
  }

  next();
};
