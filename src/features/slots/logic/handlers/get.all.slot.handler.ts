import { SlotModel } from "@fcai-sis/shared-models";
import { Request, Response } from "express";

/**
 * A handler that creates a new slot document in the database
 */

type HandlerRequest = Request;

const handler = async (req: HandlerRequest, res: Response) => {
  const { skip, limit } = req.query;

  const slots = await SlotModel.find()
    .limit(limit as unknown as number)
    .skip(Number(skip) ?? 0);

  const totalSlots = await SlotModel.countDocuments();
  return res.status(200).send({
    slots: slots.map((slot) => ({
      _id: slot._id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      day: slot.day,
    })),
    totalSlots,
  });
};

export default handler;
