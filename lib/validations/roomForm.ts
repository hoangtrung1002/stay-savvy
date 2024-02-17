import { z } from "zod";

export const roomValidation = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Title must be at least 10 characters" }),
  bedCount: z.coerce.number().min(1, { message: "Bed count is required" }),
  guestCount: z.coerce.number().min(1, { message: "Guest count is required" }),
  bathroomCount: z.coerce.number().min(0),
  kingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.string().min(1, { message: "Image is required" }),
  breakFastPrice: z.coerce.number().optional(),
  roomPrice: z.coerce.number().min(1, { message: "Room price is required" }),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airConditions: z.boolean().optional(),
  soundProofed: z.boolean().optional(),
});

export const defaultValueRoom = {
  title: "",
  description: "",
  bedCount: 0,
  guestCount: 0,
  bathroomCount: 0,
  kingBed: 0,
  queenBed: 0,
  image: "",
  breakFastPrice: 0,
  roomPrice: 0,
  roomService: false,
  TV: false,
  balcony: false,
  freeWifi: false,
  cityView: false,
  oceanView: false,
  forestView: false,
  mountainView: false,
  airConditions: false,
  soundProofed: false,
};
