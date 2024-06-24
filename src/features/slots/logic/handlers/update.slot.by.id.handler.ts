// logic for updating a slot in the database

import { SlotModel } from "@fcai-sis/shared-models";
import { Request, Response } from "express";

/**
 * A handler that updates a slot document in the database
 */

type HandlerRequest = Request<
  { id: string },
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

  const slot = await SlotModel.findByIdAndUpdate(
    req.params.id,
    { startTime, endTime, day }, // Need to check that its not gonna override the whole document
    {
      new: true,
    }
  );

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
