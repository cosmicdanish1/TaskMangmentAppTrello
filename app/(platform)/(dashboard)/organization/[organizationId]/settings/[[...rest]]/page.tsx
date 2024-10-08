import { OrganizationProfile } from "@clerk/nextjs";

const SettingPage = () => {
  return(
<>
<div className="w-full">
  <OrganizationProfile
  appearance={{
    elements:{
      rootBox:{
        boxShadow:"none",
        width:"100%"
      },
      card:{
        border:"1px solid #e5e5e5"
      }
    }
  }}
  
  />
</div>

</>
  )
}

export default SettingPage;