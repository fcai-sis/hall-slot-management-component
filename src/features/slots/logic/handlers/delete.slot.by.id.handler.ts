// logic for deleting a slot from the database

import { SlotModel } from "@fcai-sis/shared-models";
import { Request, Response } from "express";

/**
 * A handler that deletes a slot document from the database
 */

type HandlerRequest = Request<{ id: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const slot = await SlotModel.findByIdAndDelete(req.params.id);

  if (!slot) {
    return res.status(404).json({
      error: {
        message: "Slot not found",
      },
    });
  }
  return res.status(200).json({ message: "Slot Deleted successfully " }); // 204 means no content
};

export default handler;
