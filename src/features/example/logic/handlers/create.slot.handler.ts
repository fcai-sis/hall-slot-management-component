import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that creates a new hall document in the database
 */

//type handlerRequest = Request<{}, {}, {startTime: String , endTime: String , Day: String }>;

const handler = async (req: Request, res: Response) => {
  try {
    const slot = await Slot.create(req.body);
    res.status(201).json({ slot });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
