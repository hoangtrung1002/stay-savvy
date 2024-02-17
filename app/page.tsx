import { getHotels } from "@/actions/getHotels";
import HotelList from "@/components/hotel/HotelList";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const hotels = await getHotels(searchParams);

  if (!hotels) return <div>No hotels found</div>;
  return (
    <div>
      <HotelList hotels={hotels} />
    </div>
  );
}
