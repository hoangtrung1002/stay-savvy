import prismadb from "@/lib/prisma";

export const getHotels = async (searchParams: {
  title: string;
  country: string;
  state: string;
  city: string;
}) => {
  try {
    const { title, city, country, state } = searchParams;
    const hotels = await prismadb.hotel.findMany({
      where: { title: { contains: title }, country, city, state },
      include: { rooms: true },
    });

    return hotels;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
