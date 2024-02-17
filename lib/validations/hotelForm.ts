import { z } from "zod";

export const hotelValidation = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Title must be at least 10 characters" }),
  image: z.string().min(1, { message: "Image is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNights: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
});

export const defaultValuesHotel = {
  title: "",
  description: "",
  image: "",
  country: "",
  state: "",
  city: "",
  locationDescription: "",
  gym: false,
  spa: false,
  bar: false,
  laundry: false,
  restaurant: false,
  shopping: false,
  freeParking: false,
  bikeRental: false,
  freeWifi: false,
  movieNights: false,
  swimmingPool: false,
  coffeeShop: false,
};

// export const hotelAmenities = [
//   { label: "Gym", name: "gym" },
//   { label: "Spa", name: "spa" },
//   { label: "Bar", name: "bar" },
//   { label: "Laundry", name: "laundry" },
//   { label: "Restaurant", name: "restaurant" },
//   { label: "Shopping", name: "shopping" },
//   { label: "Free Parking", name: "freeParking" },
//   { label: "BikeRental", name: "bikeRental" },
//   { label: "Free Wifi", name: "freeWifi" },
//   { label: "Movie Nights", name: "movieNights" },
//   { label: "Swimming Pool", name: "swimmingPool" },
//   { label: "Coffee Shope", name: "coffeeShop" },
// ];
