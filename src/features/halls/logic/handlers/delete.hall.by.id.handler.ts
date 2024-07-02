import { HallModel } from "@fcai-sis/shared-models";
import { Request, Response } from "express";

/**
 * A handler that deletes a hall document from the database
 */

type HandlerRequest = Request<{ id: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const hall = await HallModel.findByIdAndDelete(req.params.id);

  if (!hall) {
    return res.status(404).send({
      errors: [
        {
          message: "Hall not found",
        },
      ],
    });
  }

  return res.status(200).send({ message: "Hall Deleted successfully" });
};

export default handler;
