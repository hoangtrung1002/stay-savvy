"use client";
import useBookRoom, { RoomDataType } from "@/hooks/useBookRoom";
import useLocation from "@/hooks/useLocation";
import { useAuth } from "@clerk/nextjs";
import { Booking, Hotel, Room } from "@prisma/client";
import { differenceInCalendarDays } from "date-fns";
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  MapPin,
  MountainSnow,
  Ship,
  Trees,
  Tv,
  User,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AmenityItem from "../AmenityItem";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";

interface Props {
  booking: Booking & { Room: Room | null } & { Hotel: Hotel | null };
}

const MyBookingsClient = ({ booking }: Props) => {
  const { setRoomData, setClientSecret, setPaymentIntentId, paymentIntentId } =
    useBookRoom();
  const { userId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { getCountryByCode, getStateByCode } = useLocation();
  const [bookingIsLoading, setBookingIsLoading] = useState<boolean>(false);
  const { Hotel, Room } = booking;

  if (!Hotel || !Room) return <div>Missing data...</div>;

  const country = getCountryByCode(Hotel.country);
  const state = getStateByCode(Hotel.country, Hotel.state);
  const startDate = moment(booking.startDate).format("MMMM Do YYYY");
  const endDate = moment(booking.endDate).format("MMMM Do YYYY");
  const dayCount = differenceInCalendarDays(booking.endDate, booking.startDate);

  const handleBookRoom = () => {
    if (!userId)
      return toast({
        variant: "destructive",
        description: "Oops! Make sure you are logged in",
      });

    if (!Hotel?.userId)
      return toast({
        variant: "destructive",
        description: "Something went wrong, refresh the page and try again",
      });

    setBookingIsLoading(true);
    const bookingRoomData: RoomDataType = {
      room: Room,
      totalPrice: booking.totalPrice,
      breakFastIncluded: booking.breakFastIncluded,
      startDate: booking.startDate,
      endDate: booking.endDate,
    };
    setRoomData(bookingRoomData);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        booking: {
          hotelOwnerId: Hotel.userId,
          hotelId: Hotel.id,
          roomId: Room.id,
          startDate: bookingRoomData.startDate,
          endDate: bookingRoomData.endDate,
          breakFastIncluded: bookingRoomData.breakFastIncluded,
          totalPrice: bookingRoomData.totalPrice,
        },
        payment_intent_id: paymentIntentId,
      }),
    })
      .then((res) => {
        if (res.status === 401) return router.push("/login");
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        setPaymentIntentId(data.paymentIntent.id);
        router.push("/book-room");
      })
      .catch((err: any) => {
        toast({
          variant: "destructive",
          description: `ERROR! ${err.message}`,
        });
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{Hotel.title}</CardTitle>
        <CardDescription>
          <div className="font-semibold mt-4">
            <AmenityItem>
              <MapPin className="w-4 h-4" /> {country?.name}, {state?.name},
              {Hotel.city}
            </AmenityItem>
          </div>
          <p className="py-2">{Hotel.locationDescription}</p>
        </CardDescription>
        <CardTitle>{Room.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image
            fill
            src={Room.image}
            alt={Room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem>
            <Bed className="h-4 w-4" />
            {Room.bedCount} Bed{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <User className="h-4 w-4" />
            {Room.guestCount} Guest{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" />
            {Room.bathroomCount} Bathroom{"(s)"}
          </AmenityItem>
          {!!Room.kingBed && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" />
              {Room.kingBed} King Bed{"(s)"}
            </AmenityItem>
          )}
          {!!Room.queenBed && (
            <AmenityItem>
              <Bed className="h-4 w-4" />
              {Room.queenBed} Queen Bed{"(s)"}
            </AmenityItem>
          )}
          {!!Room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" />
              {Room.roomService} Room Services
            </AmenityItem>
          )}
          {!!Room.TV && (
            <AmenityItem>
              <Tv className="h-4 w-4" />
              {Room.TV} TV
            </AmenityItem>
          )}
          {!!Room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" />
              {Room.balcony} Balcony
            </AmenityItem>
          )}
          {!!Room.freeWifi && (
            <AmenityItem>
              <Wifi className="h-4 w-4" />
              {Room.freeWifi} Free Wifi
            </AmenityItem>
          )}
          {!!Room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" />
              {Room.cityView} City View
            </AmenityItem>
          )}
          {!!Room.oceanView && (
            <AmenityItem>
              <Ship className="h-4 w-4" />
              {Room.oceanView} Ocean View
            </AmenityItem>
          )}
          {!!Room.forestView && (
            <AmenityItem>
              <Trees className="h-4 w-4" />
              {Room.forestView} Forest View
            </AmenityItem>
          )}
          {!!Room.mountainView && (
            <AmenityItem>
              <MountainSnow className="h-4 w-4" />
              {Room.mountainView} Mountain View
            </AmenityItem>
          )}
          {!!Room.airConditions && (
            <AmenityItem>
              <AirVent className="h-4 w-4" />
              {Room.airConditions} Air Condition
            </AmenityItem>
          )}
          {!!Room.soundProofed && (
            <AmenityItem>
              <VolumeX className="h-4 w-4" />
              {Room.soundProofed} Sound Proofed
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div>
            Room Price: <span className="font-bold">${Room.roomPrice}</span>
            <span className="text-xs"> /24hrs</span>
          </div>
          {!!Room.breakFastPrice && (
            <div>
              Breakfast Price:
              <span className="font-bold"> ${Room.breakFastPrice}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <CardTitle>Booking Details</CardTitle>
          <div className="text-primary/90">
            <div>
              Room booked by {booking.userName} for {dayCount} days -{" "}
              {moment(booking.bookedAt).fromNow()}
            </div>
            <div>Check-in: {startDate} at 5PM</div>
            <div>Check-out: {endDate} at 5PM</div>
            {booking.breakFastIncluded && <div>Breakfast will be served</div>}
            {booking.paymentStatus ? (
              <div className="text-teal-500">
                Paid ${booking.totalPrice} - Room Reserved
              </div>
            ) : (
              <div className="text-rose-500">
                Not paid ${booking.totalPrice} - Room not Reserved
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          disabled={bookingIsLoading}
          variant="outline"
          onClick={() => router.push(`/hotel-details/${Hotel.id}`)}
        >
          View Hotel
        </Button>
        {!booking.paymentStatus && booking.userId === userId && (
          <Button
            disabled={bookingIsLoading}
            variant="outline"
            onClick={() => handleBookRoom()}
          >
            Pay Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MyBookingsClient;
