// logic for getting all halls from the database

import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

const handler = async (req: Request, res: Response) => {
  const halls = await Hall.find();
  res.status(200).json({ halls });
};

export default handler;
