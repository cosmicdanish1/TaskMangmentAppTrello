"use client";


import { unsplash } from "@/lib/unSplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image"
import {defaultImage }from "@/constants/images"
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

export const FormPicker = ({
  id,
  errors,
}:FormPickerProps) => {

const { pending }  = useFormStatus();

const [images,setImages] = useState<Array<Record<string,any>>>(defaultImage);
const [isLoading,setIsLoading] = useState(true);
const [selectedImageId,setSelectedImageId] = useState(null);

useEffect(() => {
  const fetchImage = async () => {
    try{
      const result = await  unsplash.photos.getRandom({
        collectionIds: ["317099"],
        count:9,
      });


     if(result && result.response){
      const newImage = (result.response as Array<Record<string,any>>);
      setImages(newImage);
     }else {
      console.error("Failed to get image from UnSplash");
      
     }

    } catch(error) {
      console.log(error);
      setImages(defaultImage);
      
    }finally{
      setIsLoading(false);
    }
  };

  fetchImage();
},[]);

if(isLoading){
  return (
    <div className="p-6 flex items-center justify-center">
      <Loader2  className="h-6 w-6 text-sky-700 animate-spin"/>
    </div>
  )
}

  return(
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
    {images.map((image) =>(

    <div 
    key={image.id}
    className={cn("cursor-pointer relative aspect-video group hover:opacity-75 translate bg-muted",
      pending && "opacity-50 hover:opacity-50 cursor-auto"
    )}
    onClick={() => {
      if(pending) return;
      setSelectedImageId(image.id)
    }}
    >

      <input 
      type="radio"
      id={id}
      name={id}
      className="hidden"
      checked={selectedImageId === image.id}
      disabled={pending}
      value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
      >
      
      </input>
    <Image 
     src={image.urls.thumb}
     alt="Unsplash image"
     className="object-cover rounded-sm"
     fill
     
     
     />
     {selectedImageId === image.id &&(
       <div  className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
         <Check className="h-4 w-4 text-white"/>
       </div>
     )}
   
    <Link
    href={image.links.html}
    target="_blank"
    className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate"
    
    >
      {image.user.name}
    
    </Link>
    </div>
    ))}
      </div>
      <FormErrors
      id="image"
      errors={errors}/>
    </div>
  )
}