import { BorderBeam } from "@/components/magicui/border-beam";
import DotPattern from "@/components/magicui/dot-pattern";
import NumberTicker from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import React from "react";
import QuestionsSolved from "./_components/QuestionsSolved";

export default function Ticker() {
  return (
    <div className="relative flex h-full min-h-screen flex-col items-center justify-center pt-14">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
        )}
      />
      <h1 className="z-[9] mb-7 text-5xl font-black text-primary">
        Your Progress.
      </h1>
      <div className="bg-background relative flex w-full max-w-sm -translate-y-3 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border p-12 shadow-lg">
        <BorderBeam />
        <h1 className="text-sm text-muted">Questions Solved</h1>
        <QuestionsSolved />
      </div>
    </div>
  );
}
