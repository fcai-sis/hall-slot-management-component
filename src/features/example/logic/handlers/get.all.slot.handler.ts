import { Request, Response } from "express";
import Slot from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request<
  {},
  {},
  {
    page: number;
    pageSize: number;
  }
>;

const handler = async (req: Request, res: Response) => {
  const page = req.body.page;
  const pageSize = req.body.pageSize;

  const slots = await Slot.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.status(200).json({ slots });
};

export default handler;
