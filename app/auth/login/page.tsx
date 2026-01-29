"use client";

import { AuthLayout } from "@/components/auth-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">
        <CardContent className="flex flex-col items-center p-8">
          <Image
            src="/najmLogo.png"
            alt="Najm Drone"
            width={120}
            height={120}
            className="object-contain mb-6"
            priority
          />

          <div className="text-center space-y-1 mb-8">
            <h1 className="text-xl font-bold text-slate-800">Welcome Back</h1>
            <p className="text-xs text-slate-400">
              Sign in to access the dashboard
            </p>
          </div>

          <form className="w-full space-y-5">
            <div className="space-y-1">
              <Label
                className="text-xs text-slate-500 font-medium"
                htmlFor="email"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@najm.sa"
                className="h-10 bg-slate-50 border-slate-200 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label
                className="text-xs text-slate-500 font-medium"
                htmlFor="password"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="........"
                  className="h-10 bg-slate-50 border-slate-200 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* link to forgot password */}
              <div className="flex justify-end pt-1">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-blue-500 hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Link href="/dashboard" className="w-full block">
              <Button className="w-full h-10 bg-[#0070CD] hover:bg-[#005bb5] text-white font-semibold mt-2">
                Sign In
              </Button>
            </Link>

            {/* continue with Nafath */}

            {/* <div className="flex items-center gap-2 my-4">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-xs text-slate-400">Or continue with</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <Button
              variant="outline"
              className="w-full h-10 bg-[#14b8a6] hover:bg-[#0d9488] text-white border-0 font-semibold flex items-center justify-center gap-2"
            >
              <span>Sign in with Nafath</span>
              <span className="bg-white/20 px-1 rounded text-xs font-bold">
                نفاذ
              </span>
            </Button> */}

           {/* link to sign up page  */}
            <div className="text-center mt-6">
              <span className="text-xs text-slate-400">
                I don&apos;t have an account{" "}
              </span>
              <Link
                href="/auth/signup"
                className="text-xs text-blue-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
