import { HallModel, HallType } from "@fcai-sis/shared-models";
import { Request, Response } from "express";

/**
 * A handler that creates a new hall document in the database
 */
type HandlerRequest = Request<
  {},
  {},
  {
    hall: HallType;
  }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { hall } = req.body;

  const createdHall = await HallModel.create({
    name: hall.name,
    capacity: hall.capacity,
  });

  const response = {
    hall: {
      name: createdHall.name,
      capacity: createdHall.capacity,
    },
  };

  return res.status(201).json(response);
};

export default handler;
