"use client";

import { AuthLayout } from "@/components/auth-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: undefined, // We don't use redirect, we use OTP
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      // Store email in sessionStorage for the reset page
      sessionStorage.setItem("resetEmail", email);

      // Redirect to reset password page after 2 seconds
      setTimeout(() => {
        router.push("/auth/reset-password");
      }, 2000);
    } catch {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

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
              Enter your email address and we&apos;ll send you an OTP code
            </p>
          </div>

          {success ? (
            <div className="w-full text-center space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg p-4">
                OTP code sent! Check your email inbox.
              </div>
              <p className="text-xs text-slate-500">
                Redirecting to reset page...
              </p>
            </div>
          ) : (
            <form className="w-full space-y-6" onSubmit={handleSendOTP}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
                  {error}
                </div>
              )}

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-[#0070CD] hover:bg-[#005bb5] text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send OTP Code"
                )}
              </Button>

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
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
