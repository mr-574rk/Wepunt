"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Star, Trophy, Flame, ChevronRight, Info } from "lucide-react";

const CHALLENGES = [
  {
    id: "starter",
    tier: "Starter",
    title: "₦50K",
    feeLabel: "Entry fee: ₦5,000",
    funding: "₦50,000",
    target: "₦5,000",
    maxLoss: "₦3,000",
    minBets: "5",
    split: "40%",
    featured: false,
    icon: <Flame size={14} color="var(--red)" />,
  },
  {
    id: "pro",
    tier: "Pro",
    title: "₦200K",
    feeLabel: "Entry fee: ₦18,000",
    funding: "₦200,000",
    target: "₦20,000",
    maxLoss: "₦12,000",
    minBets: "8",
    split: "40%",
    featured: true,
    icon: <Star size={14} color="#fff" fill="#fff" />,
  },
  {
    id: "elite",
    tier: "Elite",
    title: "₦500K",
    feeLabel: "Entry fee: ₦40,000",
    funding: "₦500,000",
    target: "₦50,000",
    maxLoss: "₦30,000",
    minBets: "10",
    split: "40%",
    featured: false,
    icon: <Trophy size={14} color="var(--red)" />,
  },
];

export default function ChallengesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="page-noPad" style={{ background: "#fff" }}>
      {/* Header */}
      <div className="top-header">
        <div className="logo"><div className="logo-mark"><Zap size={16} color="#fff" fill="#fff" /></div>WePunt</div>
        <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Choose Challenge</span>
      </div>

      {/* Live strip */}
      <div className="live-strip">
        <span><span className="live-strip-dot" />LIVE</span>
        <span>Arsenal vs Man City &mdash; 1.85</span>
        <span>Lakers vs Celtics &mdash; 1.92</span>
        <span>PSG vs Bayern &mdash; 2.10</span>
        <span>Chelsea vs Liverpool &mdash; 1.75</span>
      </div>

      <div style={{ padding: "20px var(--pad)", background: "var(--bg)" }}>
        {/* Intro */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 4 }}>Pick your challenge</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            Hit the profit target without blowing the max loss. Get funded. Keep <span style={{ color: "var(--green)", fontWeight: 700 }}>40%</span>.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {CHALLENGES.map((c) => (
            <div
              key={c.id}
              className={`challenge-card${c.featured ? " featured" : ""}`}
              onClick={() => setSelected(c.id)}
              style={{ cursor: "pointer", outline: selected === c.id ? "2.5px solid var(--red)" : "none" }}
            >
              <div className="challenge-card-accent" />
              {c.featured && <div className="popular-tag"><Star size={10} fill="#fff" />Most Popular</div>}

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, marginTop: 8 }}>
                {c.icon}
                <span className="challenge-tier">{c.tier}</span>
              </div>
              <div className="challenge-title">{c.title}</div>
              <div className="challenge-fee">{c.feeLabel}</div>

              <div className="spec-grid">
                <div className="spec-item">
                  <div className="spec-label">Funding</div>
                  <div className="spec-value">{c.funding}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Target Profit</div>
                  <div className="spec-value green">{c.target}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Max Loss</div>
                  <div className="spec-value red">{c.maxLoss}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Min. Bets</div>
                  <div className="spec-value">{c.minBets} bets</div>
                </div>
              </div>

              <button
                className={`btn btn-primary btn-lg btn-full${c.featured ? " btn-pulse-red" : ""}`}
                onClick={(e) => { e.stopPropagation(); router.push("/dashboard"); }}
              >
                Start {c.tier} Challenge <ChevronRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="info-box" style={{ marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Info size={14} color="var(--text-muted)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>How it works</span>
          </div>
          <p>
            1. Buy a challenge and place mock bets via the app.<br />
            2. Our admins mirror your bets in real markets.<br />
            3. Hit the profit target: get a funded account + keep 40%.
          </p>
        </div>
      </div>
    </div>
  );
}
