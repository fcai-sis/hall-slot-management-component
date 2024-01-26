import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request<
  {},
  {},
  { startTime: String; endTime: String; Day: String }
>;

const handler = async (req: Request, res: Response) => {
  const slot = await Slot.create(req.body);
  res.status(201).json({ slot });
};

export default handler;
