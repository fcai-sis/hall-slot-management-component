// logic for updating a hall in the database

import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that updates a hall document in the database
 */

type HandlerRequest = Request<
  { id: string },
  {},
  { startTime: string; endTime: string; day: string }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { startTime, endTime, day } = req.body;

  const slot = await Slot.findByIdAndUpdate(
    req.params.id,
    { startTime, endTime, day }, // Need to check that its not gonna override the whole document
    {
      new: true,
    }
  );

  if (!slot) {
    return res.status(404).json({ message: "Slot not found" });
  }

  res.status(200).json({ slot });
};

export default handler;
