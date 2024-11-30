import { auth } from "@/app/auth";
import { UserNav } from "./user-nav";

export async function TopBar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-xl">EMR Ireland</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="w-full flex-1" />
          <UserNav user={session?.user} />
        </div>
      </div>
    </header>
  );
}
