// logic for deleting a hall from the database

import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that deletes a hall document from the database
 */

const handler = async (req: Request, res: Response) => {
  const hall = await Hall.findByIdAndDelete(req.params.id);

  if (!hall) {
    return res.status(404).json({ error: "Hall not found" });
  }

  res.status(204).end(); // 204 means no content
};

export default handler;
