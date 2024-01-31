import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that creates a new slot document in the database
 */

type HandlerRequest = Request;

const handler = async (req: HandlerRequest, res: Response) => {
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const slots = await Slot.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return res.status(200).send({
    slots: slots.map((slot) => ({
      _id: slot._id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      day: slot.day,
    })),
  });
};

export default handler;
