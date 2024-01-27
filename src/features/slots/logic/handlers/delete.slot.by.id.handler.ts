// logic for deleting a hall from the database

import { Request, Response } from "express";
import Slot from "../../data/models/slot.model";

/**
 * A handler that deletes a hall document from the database
 */

type HandlerRequest = Request<{ id: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const slot = await Slot.findByIdAndDelete(req.params.id);

  if (!slot) {
    return res.status(404).json({ error: "Slot not found" });
  }

  res.status(204).json({ message: "Slot Deleted successfully " }); // 204 means no content
};

export default handler;
