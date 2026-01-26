"use client";

import { AuthLayout } from "@/components/auth-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <p className="text-xs text-slate-500">Create your new password</p>
          </div>

          <form className="w-full space-y-5">
            <div className="space-y-1">
              <Label
                className="text-xs text-slate-500 font-medium"
                htmlFor="newPassword"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
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
            </div>

            <div className="space-y-1">
              <Label
                className="text-xs text-slate-500 font-medium"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="h-10 bg-slate-50 border-slate-200 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <Link href="/auth/login" className="w-full block">
              <Button className="w-full h-10 bg-[#0070CD] hover:bg-[#005bb5] text-white font-semibold mt-4">
                Reset Password
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
