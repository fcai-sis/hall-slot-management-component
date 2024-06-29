// logic for getting all halls from the database

import { HallModel } from "@fcai-sis/shared-models";
import { Request, Response } from "express";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request;

const handler = async (req: HandlerRequest, res: Response) => {
  const { limit, skip } = req.query;

  const halls = await HallModel.find()
    .limit(limit as unknown as number)
    .skip(Number(skip) ?? 0)
    .exec();

  return res.status(200).json({
    halls: halls.map((hall) => ({
      _id: hall._id,
      name: hall.name,
      capacity: hall.capacity,
    })),
  });
};

export default handler;
