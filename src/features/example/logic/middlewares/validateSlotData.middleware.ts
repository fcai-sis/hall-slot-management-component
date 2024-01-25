import { NextFunction, Request, Response } from "express";
//import * as validator from "express-validator";

export const validateSlotData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { startTime, endTime } = req.body;

  // Validate that startTime and endTime are present and in a valid format
  if (
    !startTime ||
    !endTime ||
    !isValidTimeFormat(startTime) ||
    !isValidTimeFormat(endTime)
  ) {
    return res.status(400).json({ message: "Invalid slot data" });
  }

  // You can add more specific validation rules based on your requirements

  next();
};

// Helper function to validate time format (HH:mm)
const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  return timeRegex.test(time);
};
