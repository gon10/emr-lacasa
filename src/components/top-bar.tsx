import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserNav } from "./user-nav";
import { auth } from "@/app/auth";
import { Suspense } from "react";

function TopBarSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      <div className="space-y-1">
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-3 w-16 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

async function UserSection() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="hidden text-right md:block">
        <p className="text-xs font-medium leading-none">{session.user.name}</p>
        <p className="text-xs text-muted-foreground">Doctor</p>
      </div>
      <UserNav user={session.user} />
    </div>
  );
}

export function TopBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="text-xl font-bold">Logo</div>
        <div className="ml-8 mr-auto w-[400px]">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search anything" className="pl-8" />
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                2
              </div>
            </div>
          </div>
          <Suspense fallback={<TopBarSkeleton />}>
            <UserSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
