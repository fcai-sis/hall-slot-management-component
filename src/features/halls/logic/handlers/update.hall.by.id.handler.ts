// logic for updating a hall in the database

import { HallModel } from "@fcai-sis/shared-models";
import { Request, Response } from "express";

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

  const hall = await HallModel.findByIdAndUpdate(
    req.params.id,
    { name, capacity }, // Need to check that its not gonna override the whole document
    {
      new: true,
    }
  );

  if (!hall) {
    return res.status(404).send({
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
