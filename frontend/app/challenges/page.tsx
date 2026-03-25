"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Star, Flame, Trophy, ChevronRight, Info } from "lucide-react";

const CHALLENGES = [
  {
    id:"starter", tier:"Starter", label:"Starter", icon:<Flame size={13} color="var(--red)" />,
    funding:"₦50,000", fundingRaw:50000,
    fee:"₦5,000", target:"₦5,000 (10%)", maxLoss:"₦2,500 (5%)", minBets:"20 bets", days:"30 days",
    featured:false,
  },
  {
    id:"pro", tier:"Pro", label:"Pro", icon:<Star size={13} color="#fff" fill="#fff" />,
    funding:"₦200,000", fundingRaw:200000,
    fee:"₦18,000", target:"₦20,000 (10%)", maxLoss:"₦10,000 (5%)", minBets:"20 bets", days:"30 days",
    featured:true,
  },
  {
    id:"elite", tier:"Elite", label:"Elite", icon:<Trophy size={13} color="var(--red)" />,
    funding:"₦500,000", fundingRaw:500000,
    fee:"₦40,000", target:"₦50,000 (10%)", maxLoss:"₦25,000 (5%)", minBets:"20 bets", days:"30 days",
    featured:false,
  },
];

export default function ChallengesPage() {
  const router = useRouter();
  return (
    <div className="page-noPad">
      <div className="top-header">
        <div className="logo"><div className="logo-mark"><Zap size={15} color="#fff" fill="#fff" /></div>WePunt</div>
        <span style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.07em" }}>Challenges</span>
        <div style={{ width:60 }} />
      </div>

      <div className="live-strip">
        <span><span className="live-dot" />LIVE</span>
        <span style={{ color:"var(--text-primary)", fontWeight:700 }}>Arsenal vs Man City</span><span style={{ color:"var(--green)" }}>1.85</span>
        <span style={{ color:"var(--text-primary)", fontWeight:700 }}>PSG vs Bayern</span><span style={{ color:"var(--green)" }}>2.10</span>
      </div>

      <div style={{ padding:"20px var(--pad)" }}>
        <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.02em", marginBottom:4 }}>Pick your challenge</h1>
        <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.55, marginBottom:20 }}>
          Hit the target profit without breaching max loss. Get funded. Keep <span style={{ color:"var(--green)", fontWeight:700 }}>40%</span> of profits.
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {CHALLENGES.map(c => (
            <div key={c.id} className={`challenge-card${c.featured?" featured":""}`}>
              <div className="challenge-card-bar" />
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4, marginTop:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  {c.icon}
                  <span className="c-tier">{c.tier}</span>
                </div>
                {c.featured && <div className="popular-tag"><Star size={9} fill="#fff" /> Most Popular</div>}
              </div>

              {/* Big funding number */}
              <div style={{ marginBottom:2 }}>
                <p style={{ fontSize:11, color:"var(--text-muted)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Funding</p>
                <p className="c-title">{c.funding}</p>
              </div>
              <p className="c-fee">{c.fee} entry fee</p>

              {/* Specs - visual hierarchy with big numbers */}
              <div className="spec-grid">
                <div className="spec-item">
                  <p className="spec-label">Target Profit</p>
                  <p className="spec-big green">{c.target.split(" ")[0]}</p>
                  <p style={{ fontSize:10, color:"var(--green)", opacity:0.6, marginTop:1 }}>{c.target.split(" ")[1]}</p>
                </div>
                <div className="spec-item">
                  <p className="spec-label">Max Loss</p>
                  <p className="spec-big red">{c.maxLoss.split(" ")[0]}</p>
                  <p style={{ fontSize:10, color:"var(--red)", opacity:0.6, marginTop:1 }}>{c.maxLoss.split(" ")[1]}</p>
                </div>
                <div className="spec-item">
                  <p className="spec-label">Min. Bets</p>
                  <p className="spec-big">{c.minBets}</p>
                </div>
                <div className="spec-item">
                  <p className="spec-label">Time Limit</p>
                  <p className="spec-big">{c.days}</p>
                </div>
              </div>

              <button
                className={`btn btn-primary btn-lg btn-full${c.featured?" btn-pulse-red":""}`}
                onClick={() => router.push("/dashboard")}
              >
                Start {c.label} Challenge <ChevronRight size={15} />
              </button>
            </div>
          ))}
        </div>

        <div className="info-box" style={{ marginTop:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:8 }}>
            <Info size={13} color="var(--text-muted)" />
            <span style={{ fontSize:11, fontWeight:700, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.05em" }}>How it works</span>
          </div>
          <p>Buy a challenge and submit trade picks via the app. Our admins execute in real markets. Hit the profit target within 30 days to unlock your funded account and receive 40% of all profits.</p>
        </div>
      </div>
    </div>
  );
}
