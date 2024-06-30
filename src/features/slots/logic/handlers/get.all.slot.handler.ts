import {
  DayEnum,
  DayEnumType,
  ISlot,
  SlotModel,
} from "@fcai-sis/shared-models";
import { Request, Response } from "express";

type HandlerRequest = Request;

/**
 * A handler that creates a new slot document in the database
 */
const handler = async (_: HandlerRequest, res: Response) => {
  const slots = await SlotModel.find();

  const slotsByDay: Record<DayEnumType, ISlot[]> = {
    [DayEnum[0]]: slots.filter((slot) => slot.day === DayEnum[0]),
    [DayEnum[1]]: slots.filter((slot) => slot.day === DayEnum[1]),
    [DayEnum[2]]: slots.filter((slot) => slot.day === DayEnum[2]),
    [DayEnum[3]]: slots.filter((slot) => slot.day === DayEnum[3]),
    [DayEnum[4]]: slots.filter((slot) => slot.day === DayEnum[4]),
    [DayEnum[5]]: slots.filter((slot) => slot.day === DayEnum[5]),
    [DayEnum[6]]: slots.filter((slot) => slot.day === DayEnum[6]),
  };

  const timeRanges = slots.reduce((acc: any[], slot: any) => {
    const existingSlot = acc.find(
      (s) => s.start === slot.start && s.end === slot.end
    );
    if (!existingSlot) {
      acc.push({
        start: slot.start,
        end: slot.end,
      });
    }
    return acc;
  }, []);

  const days = slots.reduce((acc: any[], slot: any) => {
    const existingSlot = acc.find((s) => s.day === slot.day);
    if (!existingSlot) {
      acc.push({
        day: slot.day,
      });
    }
    return acc;
  }, []);

  return res.status(200).send({
    slots: slotsByDay,
    timeRanges,
    days,
  });
};

export default handler;
