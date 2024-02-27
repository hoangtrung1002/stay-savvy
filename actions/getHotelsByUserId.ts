import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const getHotelsByUserId = async () => {
  try {
    const { userId } = auth();

    if (!userId) throw new Error("Unauthorize");

    const hotel = await prismadb.hotel.findMany({
      where: {
        userId,
      },
      include: {
        rooms: true,
      },
    });
    if (!hotel) return null;

    return hotel;
  } catch (error: any) {
    throw new Error(error);
  }
};
