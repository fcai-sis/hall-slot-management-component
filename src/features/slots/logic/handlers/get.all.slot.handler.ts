import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request;

const handler = async (req: HandlerRequest, res: Response) => {
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const slots = await Slot.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.status(200).json({ slots });
};

export default handler;
