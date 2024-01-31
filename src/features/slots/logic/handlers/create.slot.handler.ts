import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that creates a new slot document in the database
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
  console.log(slot);

  const response = {
    slot: {
      _id: slot._id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      day: slot.day,
    },
  };

  return res.status(201).send(response);
};

export default handler;
