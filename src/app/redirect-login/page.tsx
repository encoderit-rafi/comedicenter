import SignOut from "@/components/sign-out";
import { Circle } from "lucide-react";

export default function RedirectLoginPage() {
  return (
    <>
      <div className="h-[100vh] bg-[url('/images/cover/bg.webp')] bg-cover bg-center bg-no-repeat">
        <div className=" flex h-full items-center justify-center p-[15px]">
          <div className="flex h-full flex-col flex-wrap items-center justify-center md:flex-row md:p-5">
            <div className="grid justify-center gap-2">
              <h2 className="font-heading my-2 text-xl font-bold">
                Session expired, redirecting to login page.
              </h2>
              <div className="flex justify-center gap-3 text-white">
                <Circle
                  fill="#000"
                  className="  h-4 w-4 animate-ping [animation-delay:-0.3s]"
                />
                <Circle
                  fill="#000"
                  className=" h-4 w-4 animate-ping [animation-delay:-0.25s]"
                />
                <Circle
                  fill="#000"
                  className=" h-4 w-4 animate-ping [animation-delay:-0.2s]"
                />
                <Circle
                  fill="#000"
                  className=" h-4 w-4 animate-ping [animation-delay:-0.15s]"
                />
                <Circle fill="#000" className=" h-4 w-4 animate-ping" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignOut />
    </>
  );
}
