// logic for updating a hall in the database

import { Request, Response } from "express";
import Slot from "../../data/models/halls.model";

/**
 * A handler that updates a hall document in the database
 */

//type handlerRequest = Request<{}, {}, { name: string; capacity: number }>;

const handler = async (req: Request, res: Response) => {
  try {
    const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    res.status(200).json({ slot });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
