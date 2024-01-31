// logic for getting all halls from the database

import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request;

const handler = async (req: HandlerRequest, res: Response) => {
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const halls = await Hall.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return res.status(200).send({
    halls: halls.map((hall) => ({
      _id: hall._id,
      name: hall.name,
      capacity: hall.capacity,
    })),
  });
};

export default handler;
