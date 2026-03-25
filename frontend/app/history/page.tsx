"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, ChevronLeft, Filter, Search, TrendingUp, TrendingDown, Clock,
  Home, PlusCircle, BarChart2, Wallet
} from "lucide-react";

type BetStatus = "won" | "lost" | "pending";

const BETS: {
  id: number; date: string; teams: string; league: string;
  market: string; odds: number; stake: number; pl: number | null; status: BetStatus;
}[] = [
  { id: 1, date: "25 Mar", teams: "Arsenal vs Man City", league: "Premier League", market: "Home Win", odds: 1.85, stake: 4000, pl: 3400, status: "won" },
  { id: 2, date: "25 Mar", teams: "PSG vs Bayern Munich", league: "Champions League", market: "Over 2.5 Goals", odds: 1.72, stake: 4000, pl: -4000, status: "lost" },
  { id: 3, date: "24 Mar", teams: "Lakers vs Celtics", league: "NBA", market: "Away Win", odds: 2.10, stake: 4000, pl: 4400, status: "won" },
  { id: 4, date: "24 Mar", teams: "Chelsea vs Liverpool", league: "Premier League", market: "Both Teams Score", odds: 1.65, stake: 4000, pl: null, status: "pending" },
  { id: 5, date: "23 Mar", teams: "Real Madrid vs Barcelona", league: "La Liga", market: "Home Win", odds: 1.95, stake: 4000, pl: 3800, status: "won" },
  { id: 6, date: "23 Mar", teams: "Man Utd vs Tottenham", league: "Premier League", market: "Draw", odds: 3.40, stake: 4000, pl: -4000, status: "lost" },
  { id: 7, date: "22 Mar", teams: "Juventus vs Inter Milan", league: "Serie A", market: "Under 2.5 Goals", odds: 1.78, stake: 4000, pl: 3120, status: "won" },
];

const STATUS_ICON = {
  won: <TrendingUp size={12} />,
  lost: <TrendingDown size={12} />,
  pending: <Clock size={12} />,
};

export default function HistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | BetStatus>("all");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("history");

  const filtered = BETS.filter((b) => {
    if (filter !== "all" && b.status !== filter) return false;
    if (search && !b.teams.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const wins = BETS.filter((b) => b.status === "won").length;
  const losses = BETS.filter((b) => b.status === "lost").length;
  const totalPL = BETS.reduce((s, b) => s + (b.pl ?? 0), 0);

  return (
    <div className="page-noPad" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="top-header">
        <div className="logo"><div className="logo-mark"><Zap size={16} color="#fff" fill="#fff" /></div>WePunt</div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>Bet History</span>
        <div style={{ width: 70 }} />
      </div>

      {/* Summary Strip */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "14px var(--pad)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "var(--green)", letterSpacing: "-0.02em" }}>{wins}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Wins</div>
        </div>
        <div style={{ textAlign: "center", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "var(--red)", letterSpacing: "-0.02em" }}>{losses}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Losses</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: totalPL >= 0 ? "var(--green)" : "var(--red)", letterSpacing: "-0.02em" }}>
            {totalPL >= 0 ? "+" : ""}₦{Math.abs(totalPL).toLocaleString()}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>P/L</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "12px var(--pad) 0", background: "var(--bg)" }}>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
            <Search size={15} color="var(--text-muted)" />
          </span>
          <input
            className="input-field"
            style={{ paddingLeft: 40, height: 42, fontSize: 14 }}
            type="text"
            placeholder="Search match..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {(["all", "won", "lost", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "5px 12px", borderRadius: "var(--r-full)", border: "1.5px solid", cursor: "pointer",
                fontFamily: "inherit", fontSize: 11, fontWeight: 700, textTransform: "capitalize", letterSpacing: "0.04em",
                background: filter === f
                  ? (f === "won" ? "var(--green)" : f === "lost" ? "var(--red)" : f === "pending" ? "var(--yellow)" : "var(--red)")
                  : "var(--bg-card)",
                color: filter === f ? "#fff" : "var(--text-secondary)",
                borderColor: filter === f
                  ? (f === "won" ? "var(--green)" : f === "lost" ? "var(--red)" : f === "pending" ? "var(--yellow)" : "var(--red)")
                  : "var(--border-2)",
              }}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Bet List */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", margin: "0 var(--pad)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
        {filtered.length === 0 && (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>No bets found</div>
        )}
        {filtered.map((b, i) => (
          <div key={b.id} style={{
            padding: "14px var(--pad)",
            borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
            display: "flex", flexDirection: "column", gap: 8
          }}>
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="bet-teams" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{b.teams}</div>
                <div className="bet-meta">{b.league} &middot; {b.date}</div>
              </div>
              <span className={`badge badge-${b.status}`} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 3 }}>
                {STATUS_ICON[b.status]} {b.status}
              </span>
            </div>

            {/* Bottom row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>{b.market}</span>
                <div className="bet-odds-pill" style={{
                  background: b.status === "won" ? "var(--green)" : b.status === "pending" ? "var(--bg-section)" : "var(--bg-section)",
                  color: b.status === "won" ? "#fff" : "var(--text-secondary)"
                }}>{b.odds.toFixed(2)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 1 }}>Stake ₦{b.stake.toLocaleString()}</div>
                <div className={`bet-pl ${b.pl === null ? "" : b.pl >= 0 ? "pos" : "neg"}`} style={{ fontSize: 14, fontWeight: 900 }}>
                  {b.pl === null ? <span style={{ color: "var(--yellow)" }}>Pending</span>
                    : b.pl >= 0 ? `+₦${b.pl.toLocaleString()}` : `-₦${Math.abs(b.pl).toLocaleString()}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 16 }} />

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => router.push("/dashboard")}><Home size={20} /><span>Home</span></button>
        <button className="nav-item active"><Clock size={20} /><span>History</span></button>
        <button className="nav-item center-action" onClick={() => router.push("/submit-bet")}>
          <div className="nav-center-circle"><PlusCircle size={24} color="#fff" /></div>
        </button>
        <button className="nav-item" onClick={() => {}}><BarChart2 size={20} /><span>Stats</span></button>
        <button className="nav-item" onClick={() => router.push("/funded")}><Wallet size={20} /><span>Wallet</span></button>
      </nav>
    </div>
  );
}
