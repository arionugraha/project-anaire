import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

const NavBar = async () => {
   const session = await getServerSession(authOptions);

   return (
      <div className="flex bg-gray-500 space-x-4">
         <Link href={"/"}>Home</Link>
         <Link href={"/users"}>Users Page</Link>
         {session && (
            <>
               <span>{session?.user?.name}</span>
               <Link className="ml-3" href={"/api/auth/signout"}>
                  Logout
               </Link>
            </>
         )}
         {!session && <Link href={"/api/auth/signin"}>Login</Link>}
      </div>
   );
};

export default NavBar;
