// logic for updating a hall in the database

import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that updates a hall document in the database
 */

type HandlerRequest = Request<
  { id: string },
  {},
  { name: string; capacity: number }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { name, capacity } = req.body;

  const hall = await Hall.findByIdAndUpdate(
    req.params.id,
    { name, capacity }, // Need to check that its not gonna override the whole document
    {
      new: true,
    }
  );

  if (!hall) {
    return res.status(404).json({ message: "Hall not found" });
  }

  res.status(200).json({ hall });
};

export default handler;
