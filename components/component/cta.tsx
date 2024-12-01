import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl max-w-3xl">
            Your Decentralized Hacker Passport Starts Here
          </h1>
          <p className="text-gray-400 max-w-xl">
            Transform your tech journey with Sandbox - a blockchain-powered
            platform that turns your hackathon achievements into a verifiable,
            portable professional portfolio.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Hacker Card */}
          <Card className="bg-[#1C1D1D] rounded-none text-primary border-none">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">
                Build Your Digital Portfolio
              </h2>
              <p className="text-sm">
                Collect verified stamps from hackathons and tech events. Create
                a transparent, blockchain-backed record of your technical
                achievements that you can share with potential employers and
                collaborators.
              </p>
              <p className="text-sm font-mono text-gray-500 pt-8">
                VERIFIABLE • PORTABLE • DECENTRALIZED
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                className="w-full bg-gray-300 text-black hover:bg-gray-200 font-mono relative after:absolute after:inset-0 after:border after:border-gray-300 after:bg-gray-300 after:skew-x-[15deg] after:-z-10 before:absolute before:inset-0 before:border before:border-gray-300 before:bg-gray-300 before:-skew-x-[15deg] before:-z-10 overflow-visible"
                variant="secondary"
              >
                <span className="relative z-10 uppercase text-center">
                  CREATE YOUR PASSPORT
                </span>
              </Button>
            </CardFooter>
          </Card>

          {/* Organizer Card */}
          <Card className="bg-[#1C1D1D] rounded-none text-primary border-none">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">
                Create Event Stamps
              </h2>
              <p className="text-sm">
                Event organizers can easily create and issue digital stamps for
                hackathons and tech events. Provide proof of participation and
                help your community build their professional narratives.
              </p>
              <p className="text-sm font-mono text-gray-500 pt-8">
                SIMPLE • TRANSPARENT • EMPOWERING
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                className="w-full bg-gray-300 text-black hover:bg-gray-200 font-mono relative after:absolute after:inset-0 after:border after:border-gray-300 after:bg-gray-300 after:skew-x-[15deg] after:-z-10 before:absolute before:inset-0 before:border before:border-gray-300 before:bg-gray-300 before:-skew-x-[15deg] before:-z-10 overflow-visible"
                variant="secondary"
              >
                <span className="relative z-10 uppercase text-center">
                  ISSUE EVENT STAMPS
                </span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
