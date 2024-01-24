import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

type handlerRequest = Request<{}, {}, { name: string; capacity: number }>;

const handler = async (req: Request, res: Response) => {
  try {
    const hall = await Hall.create(req.body);
    res.status(201).json({ hall });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
