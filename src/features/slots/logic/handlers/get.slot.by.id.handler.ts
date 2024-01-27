import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request<{ id: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const slot = await Slot.findById(req.params.id);

  if (!slot) {
    return res.status(404).json({ error: "Slot not found" });
  }

  res.status(200).json({ slot });
};

export default handler;
