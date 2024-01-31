import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request<{}, {}, { name: string; capacity: number }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { name, capacity } = req.body;

  const hall = await Hall.create({ name, capacity });

  const response = {
    hall: {
      _id: hall._id,
      name: hall.name,
      capacity: hall.capacity,
    },
  };

  return res.status(201).json(response);
};

export default handler;
