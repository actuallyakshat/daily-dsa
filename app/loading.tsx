import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center">
      <Image
        src={"/loader.svg"}
        alt="Loading..."
        width={24}
        height={24}
        className="size-12 animate-spin"
      />
    </div>
  );
}
