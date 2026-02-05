"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Video, X, Download, AlertCircle } from "lucide-react";
import Image from "next/image";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Chart Data
const severityData = [
  { name: "High", value: 23, color: "#ef4444" },
  { name: "Moderate", value: 37, color: "#fb923c" },
  { name: "Low", value: 41, color: "#2dd4bf" },
];

const regionalData = [
  { name: "Dammam", High: 20, Moderate: 15, Low: 12 },
  { name: "AlKhobar", High: 15, Moderate: 18, Low: 10 },
  { name: "AlDhahran", High: 8, Moderate: 12, Low: 18 },
];

// Mock Data
const incidents = [
  {
    id: "INC-2024-001",
    date: "Nov 29, 2025",
    time: "14:32",
    location: "Dammam, King Fahd Rd",
    severity: "High",
    confidence: "94.5%",
    status: "Active",
  },
  {
    id: "INC-2024-002",
    date: "Nov 29, 2025",
    time: "13:15",
    location: "AlKhobar, Dhahran St",
    severity: "Moderate",
    confidence: "87.2%",
    status: "Active",
  },
  {
    id: "INC-2024-003",
    date: "Nov 29, 2025",
    time: "12:48",
    location: "AlDhahran, KFUPM Area",
    severity: "Low",
    confidence: "78.9%",
    status: "Resolved",
  },
  {
    id: "INC-2024-004",
    date: "Nov 29, 2025",
    time: "11:22",
    location: "Dammam, Corniche Rd",
    severity: "High",
    confidence: "92.8%",
    status: "Active",
  },
  {
    id: "INC-2024-005",
    date: "Nov 29, 2025",
    time: "10:05",
    location: "AlKhobar, King Abdullah St",
    severity: "Moderate",
    confidence: "85.6%",
    status: "Resolved",
  },
  {
    id: "INC-2024-006",
    date: "Nov 28, 2025",
    time: "16:45",
    location: "Dammam, Prince Mohammed Rd",
    severity: "Low",
    confidence: "76.3%",
    status: "Resolved",
  },
  {
    id: "INC-2024-007",
    date: "Nov 28, 2025",
    time: "15:20",
    location: "AlDhahran, University Blvd",
    severity: "High",
    confidence: "96.1%",
    status: "Resolved",
  },
];

export default function IncidentDetailsPage() {
  const [selectedIncident, setSelectedIncident] = useState<{
    id: string;
    date: string;
    time: string;
    location: string;
    severity: string;
    confidence: string;
    status: string;
  } | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution - Donut Chart */}
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800">
              Severity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={true}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [`${value}%`, "Percentage"]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs text-slate-500">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Incident Statistics - Bar Chart */}
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800">
              Regional Incident Statistics - Eastern Province
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} barGap={2}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs text-slate-500">{value}</span>
                  )}
                />
                <Bar dataKey="High" fill="#f87171" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Moderate" fill="#fb923c" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Low" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Incident List Table */}
      <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm text-left table-fixed">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
            <tr>
              <th className="px-3 py-3 w-[12%]">Incident ID</th>
              <th className="px-3 py-3 w-[14%]">Date & Time</th>
              <th className="px-3 py-3 w-[20%]">Location</th>
              <th className="px-3 py-3 w-[10%]">Severity</th>
              <th className="px-3 py-3 w-[10%]">Confidence</th>
              <th className="px-3 py-3 w-[9%]">Status</th>
              <th className="px-3 py-3 w-[10%]">Videos</th>
              <th className="px-3 py-3 w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-3 py-3 text-slate-600 text-xs">
                  {incident.id}
                </td>
                <td className="px-3 py-3">
                  <div className="text-slate-800 font-medium text-xs">
                    {incident.date}
                  </div>
                  <div className="text-slate-400 text-xs">{incident.time}</div>
                </td>
                <td className="px-3 py-3 text-slate-600 text-xs">
                  {incident.location}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${incident.severity === "High" ? "bg-red-100 text-red-600" : incident.severity === "Moderate" ? "bg-orange-100 text-orange-600" : "bg-teal-100 text-teal-600"}`}
                  >
                    {incident.severity}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-600 text-xs">
                  {incident.confidence}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`text-xs ${incident.status === "Active" ? "text-slate-800 font-medium" : "text-slate-500"}`}
                  >
                    {incident.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs text-teal-500 border-teal-200 hover:bg-teal-50 hover:text-teal-600 px-2"
                  >
                    <Video className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </td>
                <td className="px-3 py-3">
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-[#2563eb] hover:bg-[#1d4ed8] px-2"
                    onClick={() => setSelectedIncident(incident)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Report
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Incident Report Modal */}
      {selectedIncident && (
        <IncidentReportModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </div>
  );
}

function IncidentReportModal({
  incident,
  onClose,
}: {
  incident: {
    id: string;
    date: string;
    time: string;
    location: string;
    severity: string;
    confidence: string;
    status: string;
  };
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <h2 className="text-lg font-bold flex items-center gap-2">
            Incident Report - {incident.id}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Alert Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="text-blue-600 w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-900 font-semibold text-sm">
                Drone Report Generated
              </h3>
              <p className="text-blue-700 text-sm mt-1">
                This report was generated from drone surveillance data after
                deployment to the incident location.
              </p>
            </div>
          </div>

          {/* Top Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-slate-500 text-xs uppercase font-semibold">
                Severity Level
              </label>
              <div className="mt-1">
                <span
                  className={`px-3 py-1 rounded text-sm font-medium text-white ${incident.severity === "High" ? "bg-red-500" : incident.severity === "Moderate" ? "bg-orange-500" : "bg-teal-500"}`}
                >
                  {incident.severity}
                </span>
              </div>
            </div>
            <div>
              <label className="text-slate-500 text-xs uppercase font-semibold">
                Confidence Level
              </label>
              <div className="mt-1 p-2 bg-slate-50 rounded border border-slate-100 w-fit text-sm font-medium text-slate-700">
                {incident.confidence}
              </div>
            </div>
          </div>

          {/* Drivers Info */}
          <div>
            <label className="text-slate-500 text-sm mb-2 block">
              Driver Information
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-3">
                <p className="text-slate-500 text-xs">Driver A</p>
                <p className="text-slate-800 font-medium">Ahmed Al-Rashid</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-3">
                <p className="text-slate-500 text-xs">Driver B</p>
                <p className="text-slate-800 font-medium">Mohammed Al-Otaibi</p>
              </div>
            </div>
          </div>

          {/* License Plates */}
          <div>
            <label className="text-slate-500 text-sm mb-2 block">
              License Plates Detected
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-3">
                <p className="text-slate-500 text-xs">Car A</p>
                <p className="text-slate-800 font-medium">ABC-1234</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-3">
                <p className="text-slate-500 text-xs">Car B</p>
                <p className="text-slate-800 font-medium">XYZ-5678</p>
              </div>
            </div>
          </div>

          {/* Meta Data */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-3">
              <p className="text-slate-500 text-xs mb-1">Date & Time</p>
              <p className="text-slate-800 text-sm">
                {incident.date} <br />
                <span className="text-slate-500">{incident.time}</span>
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3">
              <p className="text-slate-500 text-xs mb-1">Coordinates</p>
              <p className="text-slate-800 text-sm">26.4207°N, 50.0888°E</p>
            </div>
          </div>

          {/* Location */}
          <div className="border border-slate-200 rounded-lg p-3">
            <p className="text-slate-500 text-xs mb-1">Location</p>
            <p className="text-slate-800 text-sm">{incident.location}</p>
          </div>

          {/* Scene Images */}
          <div>
            <label className="text-slate-500 text-sm mb-2 block">
              Accident Scene Images
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                  <Image
                    src="/ SceneView1.png"
                    alt="Scene View 1"
                    width={200}
                    height={150}
                    className="object-cover w-full h-full opacity-80"
                  />
                </div>
                <div className="absolute bottom-0 w-full bg-white/90 py-1 text-center text-xs font-medium text-slate-700">
                  Scene View 1
                </div>
              </div>
              <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                  <Image
                    src="/ SceneView2.png"
                    alt="Scene View 2"
                    width={200}
                    height={150}
                    className="object-cover w-full h-full opacity-80"
                  />
                </div>
                <div className="absolute bottom-0 w-full bg-white/90 py-1 text-center text-xs font-medium text-slate-700">
                  Scene View 2
                </div>
              </div>
            </div>
          </div>

          {/* Plate Images */}
          <div>
            <label className="text-slate-500 text-sm mb-2 block">
              License Plate Images
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/1] bg-slate-800 rounded-lg overflow-hidden relative group flex items-center justify-center">
                <Image
                  src="/Plate.png"
                  alt="Scene View 2"
                  width={200}
                  height={150}
                  className="object-cover w-full h-full opacity-80"
                />

                <div className="absolute bottom-0 w-full bg-white/90 py-1 text-center text-xs font-medium text-slate-700">
                  Car A: ABC-1234
                </div>
              </div>
              <div className="aspect-[3/1] bg-slate-800 rounded-lg overflow-hidden relative group flex items-center justify-center">
                <Image
                  src="/Plate.png"
                  alt="Scene View 2"
                  width={200}
                  height={150}
                  className="object-cover w-full h-full opacity-80"
                />
                <div className="absolute bottom-0 w-full bg-white/90 py-1 text-center text-xs font-medium text-slate-700">
                  Car B: XYZ-5678
                </div>
              </div>
            </div>
          </div>

          {/* Operator Notes */}
          <div>
            <label className="text-slate-500 text-sm mb-2 block">
              Operator Notes
            </label>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <p className="text-slate-700 text-sm leading-relaxed">
                Drone surveillance completed. Two-vehicle collision detected in
                Dammam area. Emergency services have been notified. Both
                vehicles sustained moderate damage. Traffic congestion building
                up in the area. Detailed analysis complete.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex gap-3 justify-between sticky bottom-0 shrink-0">
          <Button className="flex-1 bg-teal-400 hover:bg-teal-500 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button
            variant="secondary"
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
