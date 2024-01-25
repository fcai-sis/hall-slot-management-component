import { Request, Response } from "express";
import Slot from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

const handler = async (req: Request, res: Response) => {
  const slots = await Slot.find();
  res.status(200).json({ slots });
};

export default handler;
