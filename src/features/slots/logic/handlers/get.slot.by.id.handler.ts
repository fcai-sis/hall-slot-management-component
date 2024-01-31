import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that creates a new slot document in the database
 */

type HandlerRequest = Request<{ id: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const slot = await Slot.findById(req.params.id);

  if (!slot) {
    return res.status(404).json({
      error: {
        message: "Slot not found",
      },
    });
  }

  return res.status(200).send({
    slot: {
      _id: slot._id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      day: slot.day,
    },
  });
};

export default handler;
