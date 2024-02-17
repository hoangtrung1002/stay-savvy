import AddHotelForm from "@/components/hotel/AddHotelForm";
import { auth } from "@clerk/nextjs";

const CreateHotel = async () => {
  const { userId } = auth();

  if (!userId) return <div>Not authenticated...</div>;

  return (
    <div>
      <AddHotelForm />
    </div>
  );
};

export default CreateHotel;
