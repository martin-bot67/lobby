"use client";

import { Users, Headphones, Shield } from "lucide-react";

// Discord icon as inline SVG (Lucide doesn't include it)
function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

export interface LobbyCardData {
  id: string;
  game: string;
  gameTag: string; // short tag like "CS2"
  host: string;
  rank: string;
  rankColor: string; // Tailwind text color class
  description: string;
  slots: number;
  maxSlots: number;
  discordInvite: string; // placeholder URL
  accentFrom: string;
  accentTo: string;
}

function SlotPips({
  filled,
  max,
}: {
  filled: number;
  max: number;
}) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i < filled ? "bg-violet-400" : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function LobbyCard({ lobby }: { lobby: LobbyCardData }) {
  const open = lobby.maxSlots - lobby.slots;
  const isFull = open === 0;

  return (
    <div className="group relative flex flex-col bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 hover:shadow-xl hover:shadow-black/30 transition-all duration-200">
      {/* Top accent stripe */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${lobby.accentFrom} ${lobby.accentTo}`}
      />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            {/* Game tag */}
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Shield size={10} className="text-slate-500" />
              {lobby.game}
            </span>
            {/* Host */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                {lobby.host[0]}
              </div>
              <span className="text-sm font-semibold text-slate-100">
                {lobby.host}
              </span>
            </div>
          </div>

          {/* Slot count badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
            isFull
              ? "bg-red-500/10 border-red-500/30 text-red-400"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          }`}>
            <Users size={11} />
            {lobby.slots}/{lobby.maxSlots}
          </div>
        </div>

        {/* Rank */}
        <div className="flex items-center gap-2">
          <Headphones size={12} className="text-slate-500 flex-shrink-0" />
          <span className={`text-xs font-semibold ${lobby.rankColor}`}>
            {lobby.rank}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {lobby.description}
        </p>

        {/* Slot pips */}
        <div className="flex items-center justify-between">
          <SlotPips filled={lobby.slots} max={lobby.maxSlots} />
          <span className="text-[11px] text-slate-500">
            {isFull ? "Full" : `${open} open`}
          </span>
        </div>

        {/* Join button */}
        <a
          href={lobby.discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
            isFull
              ? "bg-slate-700 text-slate-500 cursor-not-allowed pointer-events-none"
              : "bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865F2]/20 hover:shadow-[#5865F2]/40 hover:-translate-y-0.5"
          }`}
        >
          <DiscordIcon size={15} />
          {isFull ? "Lobby Full" : "Join Discord Voice"}
        </a>
      </div>
    </div>
  );
}
