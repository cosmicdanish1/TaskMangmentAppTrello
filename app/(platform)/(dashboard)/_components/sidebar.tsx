"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization,useOrganizationList } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./navitem";


interface SidebarProps {
  storagekey?: string;
};


export const Sidebar = ({
  storagekey = "t-sidebar-state",
}:SidebarProps) => {
 const [expanded,setExpanded] = useLocalStorage<Record<string,any>>(
  storagekey, 
  {}
);

const {
  organization: activeOrganization,
  isLoaded: isLoadedOrg
} = useOrganization();

const {
  userMemberships,
  isLoaded: isLoadedList
} = useOrganizationList({
  userMemberships: {
    infinite: true,
  },
});


const defultAccordionValue: string[] = Object.keys(expanded)
                      .reduce((acc:string[],key:string) => {
                        if(expanded[key]){
                          acc.push(key);
                        }

                        return acc;
                      },[]);
 
 
 
 const onExpand = (id: string) =>{
  setExpanded((curr) => ({
    ...curr,
    [id]: !expanded[id],
  }))
 }
 
 
 if(!isLoadedOrg || !isLoadedList || userMemberships.isLoading){
  return(
    <>
    <Skeleton/>
    </>
  )
 }
 
 
  return(
  <>
  <div className="font-medium text-xs flex items-center mb-1">
    <span className="pl-4">
      Workspace
    </span>
    <Button asChild
     type="button"
     size="icon"
     variant="ghost"
     className="ml-auto"
    >
      <Link href="/select-org"
      >

      <Plus className="h-4 w-4"/>
      </Link>

    </Button>
  </div>
  <Accordion 
  type="multiple"
  defaultValue={defultAccordionValue}
  className="space-y-2"
  >{userMemberships.data.map(({organization}) =>(
    <NavItem 
    key={organization.id}
    isActive={activeOrganization?.id === organization.id}
    isExpanded={expanded[organization.id]}
    organization={organization as Organization}
    onExpand={onExpand}
    />
  ))}</Accordion>
  </>
  );
};