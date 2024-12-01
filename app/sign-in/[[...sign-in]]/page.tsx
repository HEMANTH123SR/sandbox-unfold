import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#1F1F23]">
      <SignIn afterSignOutUrl="/" />
    </div>
  );
}
