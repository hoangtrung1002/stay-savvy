import { getBookings } from "@/actions/getBooking";
import { getHotelById } from "@/actions/getHotelById";
import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";

interface Props {
  params: {
    hotelId: string;
  };
}
const HotelDetailsPage = async ({ params }: Props) => {
  const hotel = await getHotelById(params.hotelId);

  if (!hotel) return <div>Oop! Hotel not found</div>;
  const bookings = await getBookings(params.hotelId);
  return <HotelDetailsClient hotel={hotel} bookings={bookings} />;
};

export default HotelDetailsPage;
