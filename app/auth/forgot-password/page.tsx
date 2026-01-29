"use client";

import { AuthLayout } from "@/components/auth-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden py-6">
        <CardContent className="flex flex-col items-center p-8">
          <Image
            src="/najmLogo.png"
            alt="Najm Drone"
            width={120}
            height={120}
            className="object-contain mb-6"
            priority
          />

          <div className="text-center space-y-2 mb-8">
            <h1 className="text-xl font-bold text-slate-800">
              Forgot Password
            </h1>
            <p className="text-xs text-slate-500 max-w-[260px] mx-auto leading-relaxed">
              Enter your email address and we&apos;ll send you a reset password
              link
            </p>
          </div>

          <form className="w-full space-y-6">
            <div className="space-y-1">
              <Label
                className="text-xs text-slate-500 font-medium"
                htmlFor="email"
              >
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 bg-slate-50 border-slate-200 text-sm pr-10"
                />
                <Mail className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
              </div>
            </div>

            <Link href="/auth/reset-password" className="w-full block">
              {" "}
              {/* maybe then we should to do something here */}
              <Button className="w-full h-10 bg-[#0070CD] hover:bg-[#005bb5] text-white font-semibold">
                Send Reset Link
              </Button>
            </Link>

            <div className="flex justify-center mt-6">
              <Link
                href="/auth/login"
                className="flex items-center text-slate-500 hover:text-slate-800 text-sm gap-2 font-medium transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
