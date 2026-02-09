"use client";

import { AuthLayout } from "@/components/auth-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, ArrowLeft, Check, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Password validation helpers
const hasMinLength = (password: string) => password.length >= 6;
const hasNumber = (password: string) => /\d/.test(password);
const hasCapital = (password: string) => /[A-Z]/.test(password);
const isPasswordValid = (password: string) =>
  hasMinLength(password) && hasNumber(password) && hasCapital(password);

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<"otp" | "password">("otp");
  const router = useRouter();

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "recovery",
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      // OTP verified, move to password step
      setStep("password");
      setIsLoading(false);
    } catch {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isPasswordValid(newPassword)) {
      setError("Password does not meet requirements");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      sessionStorage.removeItem("resetEmail");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth/login");
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
              {step === "otp" ? "Enter OTP Code" : "Create New Password"}
            </h1>
            <p className="text-xs text-slate-500">
              {step === "otp"
                ? "Enter the 6-digit code sent to your email"
                : "Create your new password"}
            </p>
          </div>

          {success ? (
            <div className="w-full text-center space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg p-4">
                Password reset successfully!
              </div>
              <p className="text-xs text-slate-500">Redirecting to login...</p>
            </div>
          ) : step === "otp" ? (
            <form className="w-full space-y-5" onSubmit={handleVerifyOTP}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
                  {error}
                </div>
              )}

              {!email && (
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
                    placeholder="Enter your email"
                    className="h-10 bg-slate-50 border-slate-200 text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <Label
                  className="text-xs text-slate-500 font-medium"
                  htmlFor="otp"
                >
                  OTP Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 8-digit code"
                  className="h-12 bg-slate-50 border-slate-200 text-center text-lg tracking-widest font-mono"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))
                  }
                  maxLength={8}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-[#0070CD] hover:bg-[#005bb5] text-white font-semibold mt-4"
                disabled={isLoading || otp.length !== 8}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <div className="flex justify-center mt-6">
                <Link
                  href="/auth/forgot-password"
                  className="flex items-center text-slate-500 hover:text-slate-800 text-sm gap-2 font-medium transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Resend OTP</span>
                </Link>
              </div>
            </form>
          ) : (
            <form className="w-full space-y-5" onSubmit={handleResetPassword}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
                  {error}
                </div>
              )}

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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    {hasMinLength(newPassword) ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <Circle size={14} className="text-slate-300" />
                    )}
                    <span
                      className={`text-xs ${hasMinLength(newPassword) ? "text-green-600" : "text-slate-500"}`}
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasNumber(newPassword) ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <Circle size={14} className="text-slate-300" />
                    )}
                    <span
                      className={`text-xs ${hasNumber(newPassword) ? "text-green-600" : "text-slate-500"}`}
                    >
                      At least one number
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasCapital(newPassword) ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <Circle size={14} className="text-slate-300" />
                    )}
                    <span
                      className={`text-xs ${hasCapital(newPassword) ? "text-green-600" : "text-slate-500"}`}
                    >
                      At least one capital letter
                    </span>
                  </div>
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
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

              <Button
                type="submit"
                className="w-full h-10 bg-[#0070CD] hover:bg-[#005bb5] text-white font-semibold mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
