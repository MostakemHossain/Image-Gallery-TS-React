import { nanoid } from "nanoid";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import CloseIcon from "../../assets/Icons/CloseIcon";
import ImageIcon from "../../assets/Icons/ImageIcon";
import { ImageGallery } from "../../types/global.types";
import Modal from "../Modal/Modal";

interface AddImageCard {
  setGalleryData: React.Dispatch<React.SetStateAction<ImageGallery[]>>;
}

const AddImageCard = ({ setGalleryData }: AddImageCard) => {
    const [ismodalOpen, setIsmodalOpen] = useState(false);
    const handleImageSubmit= (event:React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const imageURL=event.currentTarget["image-url"].value;
  
      if(!imageURL) return;
  
      setGalleryData((prev)=>[
          ...prev,
          {
              id: nanoid(),
              slug:imageURL,
              isSelected:false
          }
      ])
      setIsmodalOpen(false);
  
    }

  return (
    <>
      <button 
       type="button"
        onClick={() => setIsmodalOpen(true)}
       
        className={twMerge(
          "rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300 p-8 aspect-square"
        )}
      >
        <ImageIcon />
        <p className="text-xs font-semibold md:text-base whitespace-nowrap">
          Add Image
        </p>
      </button>
      <Modal
        open={ismodalOpen}
        handleClose={() => setIsmodalOpen(false)}
        modalId="addImageModal"
      >
        <form onSubmit={handleImageSubmit} className="relative py-12 px-6 bg-neutral-50 rounded w-[680px] max-h-[95vh]"> 
          <CloseIcon
            onClick={() => setIsmodalOpen(false)}
            width={31}
            className="absolute top-4 right-4 cursor-pointer text-red-600 hover:text-red-700 transition-all"
          >
            
          </CloseIcon>
          <h2 className="text-2xl text-center font-semibold mb-8">Add new Image URL</h2>
          <input type="url" name="image-url" id="image-url" placeholder="https://example.com/image-png" className="w-full border border-gray-300 p-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent" />
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-8 py-2.5 bg-emerald-600 rounded text-white hover:bg-emerald-700 transition-colors duration-300 ">Add Image</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddImageCard;
