"use client";

import { useState } from "react";
import Link from "next/link";
import { PathKey } from "@/lib/quiz";

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  whatsapp: string | null;
  current_role: string | null;
  result_path: PathKey;
  builder_score: number;
  automation_score: number;
  data_score: number;
  creative_score: number;
  growth_score: number;
}

const PATH_COLORS: Record<string, string> = {
  builder: "bg-indigo-100 text-indigo-700",
  automation: "bg-sky-100 text-sky-700",
  data: "bg-emerald-100 text-emerald-700",
  creative: "bg-amber-100 text-amber-700",
  growth: "bg-pink-100 text-pink-700",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/admin/leads?password=${encodeURIComponent(password)}`);
    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads ?? []);
      setAuthed(true);
    } else {
      setError("Incorrect password.");
    }
    setLoading(false);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-slate-900 mb-6">Admin Access</h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-indigo-400"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-500 text-white font-semibold text-sm disabled:opacity-50"
            >
              {loading ? "Checking..." : "Access Leads"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Leads ({leads.length})
          </h1>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Back to site
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Date", "Name", "Email", "WhatsApp", "Role", "Path", "Scores"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400 text-sm">
                      No leads yet.
                    </td>
                  </tr>
                )}
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">
                      {new Date(lead.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "2-digit",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{lead.email}</td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{lead.whatsapp ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{lead.current_role ?? "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${PATH_COLORS[lead.result_path] ?? "bg-slate-100 text-slate-600"}`}>
                        {lead.result_path}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap font-mono">
                      B:{lead.builder_score} A:{lead.automation_score} D:{lead.data_score} C:{lead.creative_score} G:{lead.growth_score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
