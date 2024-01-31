// logic for deleting a hall from the database

import { Request, Response } from "express";
import Hall from "../../data/models/halls.model";

/**
 * A handler that deletes a hall document from the database
 */

type HandlerRequest = Request<{ id: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const hall = await Hall.findByIdAndDelete(req.params.id);

  if (!hall) {
    return res.status(404).send({
      error: {
        message: "Hall not found",
      },
    });
  }

  // Werid the message is not showing
  return res.status(200).send({ message: "Hall Deleted successfully" }); // 204 means no content
};

export default handler;
