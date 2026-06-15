"use client";

import { useState } from "react";
import { Radio, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import LobbyCard, { LobbyCardData } from "@/components/LobbyCard";
import CreateLobbyModal from "@/components/CreateLobbyModal";

// --- Placeholder lobby data ---
const MOCK_LOBBIES: LobbyCardData[] = [
  {
    id: "1",
    game: "Counter-Strike 2",
    gameTag: "CS2",
    host: "ArapX",
    rank: "16,450 (Purple)",
    rankColor: "text-purple-400",
    description:
      "Premier grind, need a solid smoke player. Chilled. No ragers, just focused plays.",
    slots: 3,
    maxSlots: 5,
    discordInvite: "https://discord.gg/placeholder-cs2",
    accentFrom: "from-purple-600",
    accentTo: "to-violet-500",
  },
  {
    id: "2",
    game: "Valorant",
    gameTag: "VAL",
    host: "ViperMain",
    rank: "Diamond II",
    rankColor: "text-cyan-400",
    description:
      "Comp push, have mic please. Looking for DPS or flex. We're climbing to Ascendant this split.",
    slots: 2,
    maxSlots: 5,
    discordInvite: "https://discord.gg/placeholder-val",
    accentFrom: "from-rose-600",
    accentTo: "to-pink-500",
  },
  {
    id: "3",
    game: "League of Legends",
    gameTag: "LoL",
    host: "FakerJunior",
    rank: "Emerald I",
    rankColor: "text-emerald-400",
    description:
      "Flex queue, looking for a chill Jungler. Pref someone who can call objectives. Discord comms.",
    slots: 4,
    maxSlots: 5,
    discordInvite: "https://discord.gg/placeholder-lol",
    accentFrom: "from-amber-500",
    accentTo: "to-yellow-400",
  },
  {
    id: "4",
    game: "Overwatch 2",
    gameTag: "OW2",
    host: "MercyMain",
    rank: "Gold 3",
    rankColor: "text-yellow-400",
    description:
      "Quick play and vibes, anyone welcome! No stress, just having fun and maybe trying new heroes.",
    slots: 1,
    maxSlots: 5,
    discordInvite: "https://discord.gg/placeholder-ow2",
    accentFrom: "from-orange-500",
    accentTo: "to-amber-400",
  },
];

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <Navbar onCreateLobby={() => setModalOpen(true)} />

      {/* Page content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Live indicator */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <Radio size={14} className="text-slate-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-50 tracking-tight">
                Active Lobbies
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {MOCK_LOBBIES.length} lobbies open right now
              </p>
            </div>
          </div>

          {/* Subtle CTA for first-time context */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles size={12} className="text-violet-400" />
            Voice channel auto-created on join
          </div>
        </div>

        {/* Lobby grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_LOBBIES.map((lobby) => (
            <LobbyCard key={lobby.id} lobby={lobby} />
          ))}
        </div>

        {/* Empty-state placeholder (shown when no lobbies) */}
        {MOCK_LOBBIES.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
              <Radio size={28} className="text-slate-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-300 mb-1">
              No active lobbies
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Be the first to create one and invite your squad.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all"
            >
              + Create Lobby
            </button>
          </div>
        )}
      </main>

      {/* Create Lobby Modal */}
      <CreateLobbyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
