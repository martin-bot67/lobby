"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, Users, Bot, Mic } from "lucide-react";

// --- Types ---
interface CreateLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameKey = "cs2" | "lol" | "valorant" | "overwatch2";

// --- Data ---
const GAME_OPTIONS: { value: GameKey; label: string }[] = [
  { value: "cs2", label: "Counter-Strike 2" },
  { value: "lol", label: "League of Legends" },
  { value: "valorant", label: "Valorant" },
  { value: "overwatch2", label: "Overwatch 2" },
];

const RANK_OPTIONS: Record<GameKey, string[]> = {
  cs2: [
    "0–4,999 (Gray)",
    "5,000–9,999 (Cyan)",
    "10,000–14,999 (Blue)",
    "15,000–19,999 (Purple)",
    "20,000–24,999 (Pink)",
    "25,000–29,999 (Red)",
    "30,000+ (Gold)",
  ],
  lol: [
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Emerald",
    "Diamond",
    "Master",
    "Grandmaster",
    "Challenger",
  ],
  valorant: [
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Ascendant",
    "Immortal",
    "Radiant",
  ],
  overwatch2: [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Master",
    "Grandmaster",
    "Champion",
  ],
};

// --- Sub-components ---
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
      {children}
    </label>
  );
}

function SelectField({
  value,
  onChange,
  children,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all cursor-pointer"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
      />
    </div>
  );
}

// --- Main Component ---
export default function CreateLobbyModal({
  isOpen,
  onClose,
}: CreateLobbyModalProps) {
  const [selectedGame, setSelectedGame] = useState<GameKey | "">("");
  const [selectedRank, setSelectedRank] = useState("");
  const [description, setDescription] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(5);
  const [botEnabled] = useState(true);

  // Reset rank when game changes
  useEffect(() => {
    setSelectedRank("");
  }, [selectedGame]);

  if (!isOpen) return null;

  const rankOptions = selectedGame ? RANK_OPTIONS[selectedGame] : [];

  const handleSubmit = () => {
    if (!selectedGame || !selectedRank) return;
    // TODO: wire up to backend / Discord bot
    console.log({ selectedGame, selectedRank, description, maxPlayers });
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-50 tracking-tight">
              Create a Lobby
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Find your squad — a voice channel will be ready instantly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/60 mx-6" />

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Game select */}
          <div>
            <Label>Select Game</Label>
            <SelectField
              value={selectedGame}
              onChange={(v) => setSelectedGame(v as GameKey)}
              placeholder="Choose a game..."
            >
              {GAME_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </SelectField>
          </div>

          {/* Rank select — always visible, disabled until game chosen */}
          <div>
            <Label>Select Rank / Rating</Label>
            <div className={!selectedGame ? "opacity-40 pointer-events-none" : ""}>
              <SelectField
                value={selectedRank}
                onChange={setSelectedRank}
                placeholder={
                  selectedGame ? "Choose your rank..." : "Select a game first"
                }
              >
                {rankOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </SelectField>
            </div>
            {!selectedGame && (
              <p className="text-xs text-slate-500 mt-1.5">
                Rank options will appear once you pick a game.
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are you looking for? Chill session, serious grind, specific role..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Max players */}
          <div>
            <Label>Max Players</Label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Users
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="number"
                  min={2}
                  max={10}
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
              {/* Quick-pick buttons */}
              <div className="flex gap-1.5">
                {[2, 3, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setMaxPlayers(n)}
                    className={`w-9 h-10 rounded-lg text-xs font-semibold transition-colors border ${
                      maxPlayers === n
                        ? "bg-violet-600 border-violet-500 text-white"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Discord bot notice */}
          <div className="flex items-start gap-3 bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3.5">
            <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-[#5865F2]/20 flex items-center justify-center">
              <Bot size={14} className="text-[#5865F2]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-100">
                  Discord Voice Bot
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Posting this lobby will automatically spin up a{" "}
                <span className="text-slate-300">temporary voice channel</span>{" "}
                in the Lobby Discord server. It self-destructs when everyone
                leaves.
              </p>
            </div>
            <Mic size={14} className="text-slate-600 mt-0.5 flex-shrink-0" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedGame || !selectedRank}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-900/40"
          >
            Post Lobby
          </button>
        </div>
      </div>
    </div>
  );
}
