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
  return <HotelDetailsClient hotel={hotel} />;
};

export default HotelDetailsPage;
