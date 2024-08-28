import Link from "next/link"
import Image from "next/image"

export const Logo = () => {
  return(
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src={"/logo/logo.svg"}
           alt="logo"        
           height={30}
           width={30}
        />
<p className="text-lg text-neutral-700 pd-1">MyTask</p>

      
      </div>
    </Link>
  )
}