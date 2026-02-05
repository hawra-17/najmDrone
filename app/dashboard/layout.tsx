"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  User,
  X,
  Lock,
  Bell,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("Admin User");
  const [email, setEmail] = useState("admin@najm.sa");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dailySummary, setDailySummary] = useState(true);
  const [resolutionUpdates, setResolutionUpdates] = useState(true);

  const handleSaveSettings = () => {
    // Handle save logic here
    setIsSettingsOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B1E2D] text-white flex flex-col border-r border-slate-800 shadow-xl z-20">
        <div className="p-6 flex flex-col items-center border-b border-slate-700/50 pb-6">
          <Image
            src="/najmDark.png"
            alt="Najm Drone"
            width={100}
            height={100}
            // className="object-contain brightness-0 invert"
            className="object-contain"
            priority
          />
        </div>
        <div className="text-center py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-bold text-white">Najm</h2>
          <p className="text-xs text-cyan-400">Drone System</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-[#0070CD] rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </Link>
          <Link
            href="/dashboard/incident-details"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
          >
            <FileText size={18} />
            <span>Incident Details</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-700/50 bg-[#081621]">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-3 mb-4 px-2 w-full hover:bg-white/5 rounded-lg py-2 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              <User size={20} />
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <span className="text-sm font-semibold truncate">Admin User</span>
              <span className="text-xs text-slate-400 truncate">
                admin@najm.sa
              </span>
            </div>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs px-2 transition-colors"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative flex flex-col">
        {/* Top Header - In the design it's part of the content area white background, but let's make a sticky header if needed. 
             The image shows a title 'Najm Drone Incident Dashboard' at top left of white area. */}
        <header className="bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/najmLogo.png"
              alt="Najm Drone"
              width={100}
              height={100}
              className="object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#1e3a5f]">
                Najm Drone Incident Dashboard
              </h1>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>
          </div>
        </header>

        <div className="p-8">{children}</div>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200 relative z-[10000]">
            {/* Modal Header */}
            <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-3">
                <Image
                  src="/najmDark.png"
                  alt="Najm"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h2 className="text-lg font-bold">Settings</h2>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <User size={18} />
                  <h3 className="font-semibold">Profile Settings</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label
                      htmlFor="displayName"
                      className="text-slate-600 text-sm"
                    >
                      Display Name
                    </Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-1 bg-slate-100 border-slate-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-600 text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 bg-slate-100 border-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Lock size={18} />
                  <h3 className="font-semibold">Change Password</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label
                      htmlFor="oldPassword"
                      className="text-slate-600 text-sm"
                    >
                      Old Password
                    </Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="mt-1 bg-slate-100 border-slate-200"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="newPassword"
                      className="text-slate-600 text-sm"
                    >
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 bg-slate-100 border-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Bell size={18} />
                  <h3 className="font-semibold">Notification Preferences</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Daily Summary
                      </p>
                      <p className="text-xs text-slate-500">
                        Receive daily incident summaries
                      </p>
                    </div>
                    <Checkbox
                      checked={dailySummary}
                      onCheckedChange={(checked) =>
                        setDailySummary(checked as boolean)
                      }
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                  </div>
                  <div className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Resolution Updates
                      </p>
                      <p className="text-xs text-slate-500">
                        Get notified when incidents are resolved
                      </p>
                    </div>
                    <Checkbox
                      checked={resolutionUpdates}
                      onCheckedChange={(checked) =>
                        setResolutionUpdates(checked as boolean)
                      }
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <Button
                onClick={handleSaveSettings}
                className="flex-1 bg-[#0070CD] hover:bg-[#005fa3]"
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
