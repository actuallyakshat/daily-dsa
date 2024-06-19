import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { LandingOrbit } from "./_components/LandingOrbit";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative flex h-full min-h-screen flex-col items-center justify-center pt-14">
      <LandingOrbit />
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
        )}
      />
    </main>
  );
}
