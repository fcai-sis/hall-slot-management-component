// logic for getting hall by id from the database

import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

const handler = async (req: Request, res: Response) => {
  const hall = await Hall.findById(req.params.id);

  if (!hall) {
    return res.status(404).json({ error: "Hall not found" });
  }

  res.status(200).json({ hall });
};

export default handler;
