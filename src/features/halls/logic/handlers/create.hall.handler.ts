import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request<{}, {}, { name: string; capacity: number }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { name, capacity } = req.body;

  const hall = await Hall.create({ name, capacity });
  res.status(201).json({ hall });
};

export default handler;
