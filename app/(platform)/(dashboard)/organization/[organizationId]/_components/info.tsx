"use client";


import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";

export const Info = () => {
  const {organization,isLoaded} = useOrganization();

  if(!isLoaded){
    return(
      <p>Loading...</p>
    )
  }
  return(
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">

      <Image
      fill
      src={organization?.imageUrl!}
      alt="Organization"
      className="rounded-md object-cover"/>


      </div>
      <div>
        <p className="font-semibold text-xl">
          {organization?.name}
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <CreditCard className="h-3 w-3 mr-1"/>
          </div>
      </div>
    </div>
  )
}