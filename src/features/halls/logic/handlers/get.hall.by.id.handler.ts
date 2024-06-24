// logic for getting hall by id from the database

import { Request, Response } from "express";
import { HallModel } from "@fcai-sis/shared-models";

/**
 * A handler that creates a new hall document in the database
 */

type HandlerRequest = Request<{ id: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const hall = await HallModel.findById(req.params.id);

  if (!hall) {
    return res.status(404).json({
      error: {
        message: "Hall not found",
      },
    });
  }

  return res.status(200).send({
    hall: {
      _id: hall._id,
      name: hall.name,
      capacity: hall.capacity,
    },
  });
};

export default handler;
