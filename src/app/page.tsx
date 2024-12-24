import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col gap-4 items-center justify-center p-4">
      <div className="text-center">
        <p className="text-4xl font-bold">Welcome, to Menufy, where you can build restaurant menus seamlessly and serve</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button>
          <Link href="/dashboard" className="flex items-center justify-center gap-2">
            To Dashboard
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
