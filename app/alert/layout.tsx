import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Najm Alert - Emergency Reporting",
  description: "Report accidents and emergencies to Najm drone dispatch",
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function AlertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
