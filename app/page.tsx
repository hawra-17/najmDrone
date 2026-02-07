import { AuthLayout } from "@/components/auth-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <AuthLayout>
      <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden py-8">
        <CardContent className="flex flex-col items-center justify-center space-y-8 pt-6">
          <Image
            src="/najmLogo.png"
            alt="Najm Drone"
            width={180}
            height={180}
            className="object-contain"
            priority
          />

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Najm Drone System
            </h1>
            <p className="text-slate-400 font-medium">
              Incident Detection Dashboard
            </p>
          </div>

          <div className="w-full space-y-4 px-4 sm:px-8">
            <Link href="/auth/login" className="w-full block">
              <Button className="w-full h-12 text-base font-semibold bg-[#0070CD] hover:bg-[#005bb5] text-white rounded-lg shadow-sm transition-all duration-200">
                Sign In
              </Button>
            </Link>
            {/* <Link href="/auth/signup" className="w-full block">
              <Button className="w-full h-12 text-base font-semibold bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-lg shadow-sm transition-all duration-200">
                Sign Up
              </Button>
            </Link> */}
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
