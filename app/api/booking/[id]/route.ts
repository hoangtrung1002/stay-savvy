import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!params.id)
      return new NextResponse("Room id is required", { status: 400 });

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const booking = await prismadb.booking.update({
      where: { paymentIntentId: params.id },
      data: {
        paymentStatus: true,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error at /api/booking/id PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (!params.id)
      return new NextResponse("Hotel id is required", { status: 400 });

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const bookings = await prismadb.booking.findMany({
      where: {
        paymentStatus: true,
        roomId: params.id,
        endDate: { gt: yesterday },
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.log("Error at /api/booking/id GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
