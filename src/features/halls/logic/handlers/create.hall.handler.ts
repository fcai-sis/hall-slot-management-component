import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request<{}, {}, { name: string; capacity: number }>;

const handler = async (req: Request, res: Response) => {
  const hall = await Hall.create(req.body);
  res.status(201).json({ hall });
};

export default handler;
