import OrbitingCircles from "@/components/magicui/orbiting-circles";
import Image from "next/image";

export function LandingOrbit() {
  return (
    <div className="relative flex min-h-[700px] min-w-[800px] scale-50 items-center justify-center overflow-hidden bg-background sm:scale-100">
      <span className="pointer-events-none z-[9] whitespace-pre-wrap bg-gradient-to-b from-black to-primary/80 bg-clip-text text-center text-8xl font-black leading-none text-transparent">
        Daily DSA
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="z-[9] w-full max-w-[100px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={140}
      >
        <Image
          src={"/leetcode.png"}
          width={400}
          height={400}
          alt="leetcode"
          className="aspect-square w-full bg-transparent object-cover"
        />
      </OrbitingCircles>
      <OrbitingCircles
        className="z-[9] w-full max-w-[100px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={200}
      >
        <Image
          src={"/codechef.png"}
          width={1000}
          height={1000}
          alt="codechef"
          className="w-full bg-transparent object-cover"
        />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="z-[9] w-full max-w-[100px] border-none bg-transparent"
        radius={260}
        duration={20}
        reverse
      >
        <Image
          src={"/codingninjas.png"}
          width={1000}
          height={1000}
          alt="codingninja"
          className="w-full bg-transparent object-cover"
        />
      </OrbitingCircles>
      <OrbitingCircles
        className="z-[9] w-full max-w-[100px] border-none bg-transparent"
        radius={320}
        duration={20}
        delay={20}
        reverse
      >
        <Image
          src={"/codeforces.svg"}
          width={1000}
          height={1000}
          alt="codingninja"
          className="w-full bg-transparent object-cover"
        />
      </OrbitingCircles>
    </div>
  );
}
