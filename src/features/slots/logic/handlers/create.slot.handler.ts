import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request<
  {},
  {},
  {
    startTime: {
      hour: number;
      minute: number;
    };
    endTime: {
      hour: number;
      minute: number;
    };
    day: number;
  }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { startTime, endTime, day } = req.body;

  const slot = await Slot.create({ startTime, endTime, day });
  res.status(201).json({ slot });
};

export default handler;
