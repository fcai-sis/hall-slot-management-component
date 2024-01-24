import { Request, Response } from "express";
import Slot from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

const handler = async (req: Request, res: Response) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }
    res.status(200).json({ slot });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
