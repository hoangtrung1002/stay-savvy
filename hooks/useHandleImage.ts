import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";

const useHandleImage = (imageSrc: string | undefined) => {
  const [image, setImage] = useState<string | undefined>(imageSrc);
  const [imageIsDeleting, setImageIsDeleting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then(() => {
        setImage("");
        toast({ variant: "success", description: "Image removed" });
      })
      .catch(() => {
        toast({ variant: "destructive", description: "Something went wrong" });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };
  return { image, handleImageDelete, imageIsDeleting, setImage };
};

export default useHandleImage;
