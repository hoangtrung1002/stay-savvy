import { Booking, Hotel, Room } from "@prisma/client";
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  Loader2,
  MountainSnow,
  Pencil,
  Ship,
  Trash,
  Trees,
  Tv,
  User,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AmenityItem from "../AmenityItem";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import AddRoomForm from "./AddRoomForm";
import axios from "axios";
import { useToast } from "../ui/use-toast";

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room: Room;
  bookings?: Booking[];
}

const RoomCard = ({ hotel, room, bookings = [] }: RoomCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const isHotelDetailsPage = pathname.includes("hotel-details");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleDialogOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDeleteRoom = () => {
    setIsLoading(true);
    const imageKey = room.image.substring(room.image.lastIndexOf("/") + 1);

    axios
      .post(`/api/uploadthing/delete`, { imageKey })
      .then(() => {
        axios
          .delete(`/api/room/${room.id}`)
          .then(() => {
            router.refresh();
            toast({
              variant: "success",
              description: "Room deleted successfully",
            });
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            toast({
              variant: "destructive",
              description: "Something went wrong",
            });
          });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image
            fill
            src={room.image}
            alt={room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem>
            <Bed className="h-4 w-4" />
            {room.bedCount} Bed{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <User className="h-4 w-4" />
            {room.guestCount} Guest{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" />
            {room.bathroomCount} Bathroom{"(s)"}
          </AmenityItem>
          {!!room.kingBed && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" />
              {room.kingBed} King Bed{"(s)"}
            </AmenityItem>
          )}
          {!!room.queenBed && (
            <AmenityItem>
              <Bed className="h-4 w-4" />
              {room.queenBed} Queen Bed{"(s)"}
            </AmenityItem>
          )}
          {!!room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" />
              {room.roomService} Room Services
            </AmenityItem>
          )}
          {!!room.TV && (
            <AmenityItem>
              <Tv className="h-4 w-4" />
              {room.TV} TV
            </AmenityItem>
          )}
          {!!room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" />
              {room.balcony} Balcony
            </AmenityItem>
          )}
          {!!room.freeWifi && (
            <AmenityItem>
              <Wifi className="h-4 w-4" />
              {room.freeWifi} Free Wifi
            </AmenityItem>
          )}
          {!!room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" />
              {room.cityView} City View
            </AmenityItem>
          )}
          {!!room.oceanView && (
            <AmenityItem>
              <Ship className="h-4 w-4" />
              {room.oceanView} Ocean View
            </AmenityItem>
          )}
          {!!room.forestView && (
            <AmenityItem>
              <Trees className="h-4 w-4" />
              {room.forestView} Forest View
            </AmenityItem>
          )}
          {!!room.mountainView && (
            <AmenityItem>
              <MountainSnow className="h-4 w-4" />
              {room.mountainView} Mountain View
            </AmenityItem>
          )}
          {!!room.airConditions && (
            <AmenityItem>
              <AirVent className="h-4 w-4" />
              {room.airConditions} Air Condition
            </AmenityItem>
          )}
          {!!room.soundProofed && (
            <AmenityItem>
              <VolumeX className="h-4 w-4" />
              {room.soundProofed} Sound Proofed
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div>
            Room Price: <span className="font-bold">${room.roomPrice}</span>
            <span className="text-xs"> /24hrs</span>
          </div>
          {!!room.breakFastPrice && (
            <div>
              Breakfast Price:
              <span className="font-bold"> ${room.breakFastPrice}</span>
            </div>
          )}
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        {isHotelDetailsPage ? (
          <div>Hotel details page</div>
        ) : (
          <div className="flex w-full justify-between">
            <Button
              disabled={isLoading}
              type="button"
              variant="ghost"
              onClick={handleDeleteRoom}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4" /> Deleting
                </>
              ) : (
                <>
                  <Trash className="mr-2 w-4 h-4" /> Delete
                </>
              )}
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="max-w-[150px]"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Update room
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[900px] w-[90%]">
                <DialogHeader className="px-2">
                  <DialogTitle>Update Room</DialogTitle>
                  <DialogDescription>
                    Make changes to this room.
                  </DialogDescription>
                </DialogHeader>
                <AddRoomForm
                  hotel={hotel}
                  room={room}
                  handleDialogOpen={handleDialogOpen}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
