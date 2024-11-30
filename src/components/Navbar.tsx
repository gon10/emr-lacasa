"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Search,
  LogOut,
  Loader2,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

function UserAvatar({ user }: { user: any }) {
  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || user?.email?.[0].toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

function TruncatedText({
  text,
  className,
}: {
  text: string | null | undefined;
  className: string;
}) {
  if (!text) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className={`truncate ${className}`}>{text}</p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-normal">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold text-xl">EMR Ireland</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-around h-14 items-center">
          {/* Logo */}
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold text-xl">EMR Ireland</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <div className="w-full max-w-xl">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients, records..."
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
                </Button>

                {/* User Menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                      <UserAvatar user={session.user} />
                      <div className="hidden md:block text-left min-w-0 max-w-[150px]">
                        <TruncatedText
                          text={session.user?.name}
                          className="text-sm font-medium leading-none"
                        />
                        <TruncatedText
                          text={(session.user as any)?.role || "Doctor"}
                          className="text-xs text-muted-foreground"
                        />
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="flex items-center gap-2 p-2">
                      <UserAvatar user={session.user} />
                      <div className="space-y-1 min-w-0 flex-1">
                        <TruncatedText
                          text={session.user?.name}
                          className="text-sm font-medium leading-none"
                        />
                        <TruncatedText
                          text={session.user?.email}
                          className="text-xs text-muted-foreground"
                        />
                      </div>
                    </div>
                    <Separator className="my-2" />
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        asChild
                      >
                        <Link href="/profile">
                          <UserIcon className="h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        asChild
                      >
                        <Link href="/settings">
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                      </Button>
                      <Separator className="my-2" />
                      <div className="p-2">
                        <p className="text-xs font-medium leading-none mb-2">
                          Theme
                        </p>
                        <ThemeToggle />
                      </div>
                      <Separator className="my-2" />
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-red-600 hover:text-red-600 hover:bg-red-100"
                        onClick={() => signOut()}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Button asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
