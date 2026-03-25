"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, Home, Clock, Wallet, PlusCircle,
  TrendingUp, CheckCircle, AlertTriangle, BarChart2,
  ChevronRight, Bell, User
} from "lucide-react";

const BET_DATA = [
  { teams: "Arsenal vs Man City", market: "Home Win", odds: "1.85", stake: "₦4,000", pl: "+₦3,400", status: "won" },
  { teams: "PSG vs Bayern", market: "Over 2.5 Goals", odds: "1.72", stake: "₦4,000", pl: "-₦4,000", status: "lost" },
  { teams: "Lakers vs Celtics", market: "Away Win", odds: "2.10", stake: "₦4,000", pl: "+₦4,400", status: "won" },
  { teams: "Chelsea vs Liverpool", market: "Both Teams Score", odds: "1.65", stake: "₦4,000", pl: "—", status: "pending" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState("home");

  const balance = 213400;
  const target = 220000;
  const start = 200000;
  const pct = Math.min(((balance - start) / (target - start)) * 100, 100);
  const profit = balance - start;
  const maxLoss = 12000;
  const drawdownUsed = 2600;
  const drawdownPct = (drawdownUsed / maxLoss) * 100;

  return (
    <div className="page-noPad" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="top-header">
        <div className="logo"><div className="logo-mark"><Zap size={16} color="#fff" fill="#fff" /></div>WePunt</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Bell size={16} color="#fff" />
          </button>
          <button style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <User size={16} color="#fff" />
          </button>
        </div>
      </div>

      {/* Live strip */}
      <div className="live-strip">
        <span><span className="live-strip-dot" />LIVE</span>
        <span>Arsenal vs Man City &mdash; 1.85</span>
        <span>Lakers vs Celtics &mdash; 2.10</span>
        <span>PSG vs Bayern &mdash; 1.72</span>
      </div>

      <div style={{ padding: "16px var(--pad) 0" }}>
        {/* Wallet Card */}
        <div className="wallet-card" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
            <div>
              <p className="wallet-label">Current Balance</p>
              <p className="wallet-amount">₦{balance.toLocaleString()}</p>
              <p className="wallet-subtitle">
                <span style={{ color: profit >= 0 ? "rgba(255,255,255,0.9)" : "rgba(255,100,80,0.9)", fontWeight: 700 }}>
                  {profit >= 0 ? "+" : ""}₦{profit.toLocaleString()}
                </span>{" "}today
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.07em" }}>Pro</span>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginTop: 18, position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>Target Progress</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{pct.toFixed(0)}%</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.2)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${pct}%`,
                background: "linear-gradient(90deg, rgba(255,255,255,0.6), #fff)",
                borderRadius: 99,
                transition: "width 1.2s cubic-bezier(0.34,1.4,0.64,1)"
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>₦{start.toLocaleString()}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>Target: ₦{target.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div className="stat-block">
            <div className="stat-label">Bets Placed</div>
            <div className="stat-value">4</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Win Rate</div>
            <div className="stat-value green">66.7%</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Drawdown Used</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <div className="stat-value" style={{ color: drawdownPct > 70 ? "var(--red)" : "var(--text-primary)" }}>
                ₦{drawdownUsed.toLocaleString()}
              </div>
            </div>
            <div style={{ marginTop: 6 }}>
              <div style={{ height: 4, background: "var(--bg-section)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${drawdownPct}%`, background: drawdownPct > 70 ? "var(--red)" : "var(--green)", borderRadius: 99, transition: "width 0.8s ease" }} />
              </div>
              <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3 }}>Max: ₦{maxLoss.toLocaleString()}</p>
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)" }} />
              <span style={{ fontSize: 14, fontWeight: 800, color: "var(--green)" }}>Active</span>
            </div>
          </div>
        </div>

        {/* Recent Bets */}
        <div style={{ marginBottom: 4 }}>
          <div className="sh">
            <span className="sh-title">Recent Bets</span>
            <span className="sh-link" onClick={() => router.push("/history")}>See All</span>
          </div>
        </div>
      </div>

      {/* Bet List */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", marginLeft: "var(--pad)", marginRight: "var(--pad)", overflow: "hidden", boxShadow: "var(--shadow-sm)", marginBottom: 0 }}>
        {BET_DATA.map((b, i) => (
          <div key={i} className="bet-row" style={{ borderBottom: i < BET_DATA.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="bet-teams" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{b.teams}</div>
              <div className="bet-meta">{b.market} &middot; Stake {b.stake}</div>
            </div>
            <div className={`bet-odds-pill`} style={{ background: b.status === "won" ? "var(--green)" : b.status === "lost" ? "var(--bg-section)" : "var(--bg-section)", color: b.status === "won" ? "#fff" : "var(--text-secondary)" }}>
              {b.odds}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
              <span className={`badge badge-${b.status}`}>{b.status}</span>
              <span className={`bet-pl ${b.pl.startsWith("+") ? "pos" : b.pl === "—" ? "" : "neg"}`}>{b.pl}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Challenges CTA */}
      <div style={{ padding: "14px var(--pad)" }}>
        <button
          className="btn btn-outline btn-lg btn-full"
          onClick={() => router.push("/challenges")}
          style={{ justifyContent: "space-between" }}
        >
          <span>View All Challenges</span>
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <button className={`nav-item ${tab === "home" ? "active" : ""}`} onClick={() => setTab("home")}>
          <Home size={20} />
          <span>Home</span>
        </button>
        <button className={`nav-item ${tab === "history" ? "active" : ""}`} onClick={() => { setTab("history"); router.push("/history"); }}>
          <Clock size={20} />
          <span>History</span>
        </button>
        <button className="nav-item center-action" onClick={() => router.push("/submit-bet")}>
          <div className="nav-center-circle"><PlusCircle size={24} color="#fff" /></div>
        </button>
        <button className={`nav-item ${tab === "stats" ? "active" : ""}`} onClick={() => setTab("stats")}>
          <BarChart2 size={20} />
          <span>Stats</span>
        </button>
        <button className={`nav-item ${tab === "wallet" ? "active" : ""}`} onClick={() => { setTab("wallet"); router.push("/funded"); }}>
          <Wallet size={20} />
          <span>Wallet</span>
        </button>
      </nav>
    </div>
  );
}
