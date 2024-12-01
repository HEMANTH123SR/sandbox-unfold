"use client";
import React from "react";
import { newAgeFontBold } from "@/fonts/font";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Button } from "@/components/ui/button";
import { EventCard, EventCardProps } from "@/components/component/event-card";
import { Cta } from "@/components/component/cta";
import FAQ from "@/components/component/faq";
import { Footer } from "@/components/component/fotter";

const eventArray: EventCardProps[] = [
  {
    eventName: "CodeSprint 2024",
    imageUrl: "/gallery/one.webp",
    isOpened: true,
  },
  {
    eventName: "Innovators Hackathon",
    imageUrl: "/gallery/two.webp",
    isOpened: false,
  },
  {
    eventName: "DevX Challenge",
    imageUrl: "/gallery/three.webp",
    isOpened: true,
  },
  {
    eventName: "HackTheFuture",
    imageUrl: "/gallery/four.webp",
    isOpened: false,
  },
  {
    eventName: "TechFest Hackathon",
    imageUrl: "/gallery/five.webp",
    isOpened: true,
  },
  {
    eventName: "Build & Break 2024",
    imageUrl: "/gallery/six.webp",
    isOpened: true,
  },
];

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Redirect to sign-in if user is not loaded or not authenticated
  React.useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-full w-screen overflow-x-hidden bg-black flex-col">
      <CardSpotlight className="border-none border-b" color="#C1C4D4">
        <div className="border-b-2 border-[#101012] mx-5 py-5">
          <img
            src="/sandbox.png"
            alt="Sandbox Image"
            className="w-full h-auto"
          />
        </div>
      </CardSpotlight>

      <div className="px-5 w-full flex space-x-20 my-20">
        {/* Sticky user profile */}
        <div
          className="flex justify-start items-start sticky top-5 h-fit"
          style={{
            position: "sticky",
            top: "20px", // Equivalent to top-5 in Tailwind
            height: "fit-content", // Equivalent to h-fit in Tailwind
          }}
        >
          <div
            className={`border border-[#131315] w-96 flex flex-col p-5 ${newAgeFontBold.className}`}
            style={{ borderWidth: "0.3px" }}
          >
            <div className="flex flex-row space-x-4 justify-start items-center">
              <img src={user?.imageUrl} className="w-12 h-12 rounded-full" />
              <span className="text-primary capitalize text-4xl">
                {user?.username}
              </span>
            </div>

            {user?.createdAt && (
              <span className="text-primary text-base mt-2">
                Joined on {user?.createdAt.toLocaleDateString()}
              </span>
            )}
            <div className="border-[#42454A] border-b py-2 my-2"></div>

            {user?.publicMetadata.bio ? (
              <>
                <span className="text-sm my-2 text-white">
                  {user?.publicMetadata.bio as string}
                </span>
              </>
            ) : (
              <></>
            )}

            <div className="border-[#42454A] border-t py-2 my-2"></div>

            <Button variant={"outline"} className="text-xl uppercase">
              Go To Passport
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <h1
            className="text-5xl text-primary text-center"
            style={newAgeFontBold.style}
          >
            A Decentralized Passport for Hackers
          </h1>
          <div className="border-[#42454A] border-t my-5 rounded-xl"></div>
          <div className="max-h-[500px] overflow-y-scroll scroll-hidden flex flex-col">
            <div className="grid grid-cols-2 gap-6  ">
              {eventArray.map((event, index) => (
                <div className="flex flex-col" key={index}>
                  <EventCard
                    imageUrl={event.imageUrl}
                    eventName={event.eventName}
                    isOpened={event.isOpened}
                  />
                  <div className="border-b pb-8 mb-8 mx-6"></div>
                </div>
              ))}
            </div>
            <FAQ />
            <Cta />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
