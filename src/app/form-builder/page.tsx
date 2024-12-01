"use client";

import dynamic from "next/dynamic";

const FormBuilder = dynamic(() => import("./form-builder"), { ssr: false });

export default function FormCreator() {
  return (
    <div className="p-4 w-full h-full">
      <FormBuilder />
    </div>
  );
}
