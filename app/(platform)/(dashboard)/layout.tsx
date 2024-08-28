import { Navbar } from "@/app/(firstimpration)/_components/navbar";
import NavbarForDashBord from "./_components/navbar";

const DashboardLayout = ({children}:{
  children:React.ReactNode;
}) => {
  return(
    <div className="h-full">
      <NavbarForDashBord/>
      {children}
      
    </div>
  )
}
export default DashboardLayout;