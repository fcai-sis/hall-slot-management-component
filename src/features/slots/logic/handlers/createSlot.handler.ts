import { SlotModel, SlotType } from "@fcai-sis/shared-models";
import { Request, Response } from "express";

/**
 * A handler that creates a new slot document in the database
 */
type HandlerRequest = Request<
  {},
  {},
  {
    slot: SlotType;
  }
>;

const createSlotHandler = async (req: HandlerRequest, res: Response) => {
  const { slot } = req.body;

  const createdSlot = await SlotModel.create({
    start: slot.start,
    end: slot.end,
    day: slot.day,
  });

  const response = {
    slot: {
      ...createdSlot.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  };

  return res.status(201).send(response);
};

export default createSlotHandler;
