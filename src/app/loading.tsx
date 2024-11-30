import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      <span className="ml-2 text-lg text-gray-500">Loading...</span>
    </div>
  );
}
