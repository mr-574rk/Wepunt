"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, ChevronLeft, ShieldAlert, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";

const MATCHES = [
  { id: "m1", time: "19:45", league: "Premier League", away: "Arsenal", home: "Man City", markets: [{ id: "m11", name: "Home Win", odds: 1.85 }, { id: "m12", name: "Away Win", odds: 2.10 }, { id: "m13", name: "Draw", odds: 3.40 }] },
  { id: "m2", time: "20:00", league: "Champions League", away: "Bayern Munich", home: "PSG", markets: [{ id: "m21", name: "Over 2.5 Goals", odds: 1.72 }, { id: "m22", name: "Under 2.5 Goals", odds: 2.15 }] },
  { id: "m3", time: "22:30", league: "NBA", away: "Celtics", home: "Lakers", markets: [{ id: "m31", name: "Lakers Win", odds: 1.95 }] }
];

const FIXED_STAKE = 4000;

export default function SubmitBetPage() {
  const router = useRouter();
  const [matchId, setMatchId] = useState("");
  const [marketId, setMarketId] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const match = MATCHES.find(m => m.id === matchId);
  const market = match?.markets.find(m => m.id === marketId);
  const odds = market?.odds || 1.0;
  const potentialReturn = FIXED_STAKE * odds;
  const potentialProfit = potentialReturn - FIXED_STAKE;

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };

  return (
    <div className="page-noPad">
      <div className="top-header">
        <button onClick={() => { if (step===2) setStep(1); else router.back(); }} style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 10px", color:"var(--text-secondary)", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:12, fontWeight:600, fontFamily:"inherit" }}>
          <ChevronLeft size={13} /> Back
        </button>
        <span style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.85)" }}>New Trade</span>
        <div style={{ width:70 }} />
      </div>

      <div style={{ padding:"16px var(--pad)" }}>
        {done ? (
          <div style={{ background:"var(--bg-surface)", border:"1.5px solid var(--green)", borderRadius:"var(--r-lg)", padding:"32px 24px", textAlign:"center", boxShadow:"var(--shadow-green)" }}>
            <CheckCircle size={48} color="var(--green)" style={{ margin:"0 auto 16px" }} />
            <p style={{ fontSize:20, fontWeight:900, color:"#fff", letterSpacing:"-0.03em", marginBottom:8 }}>Trade Submitted!</p>
            <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.5 }}>Your trade has been queued for execution by admins. Check the <strong style={{ color:"var(--green)", cursor:"pointer" }} onClick={() => router.push("/history")}>Trades</strong> tab for live status.</p>
            <button className="btn btn-outline btn-full mt-24" onClick={() => router.push("/dashboard")}>Back to Dashboard</button>
          </div>
        ) : step === 1 ? (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <TrendingUp size={16} color="var(--red)" />
              <h1 style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.02em" }}>Live Match Feed</h1>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
              {MATCHES.map(m => (
                <div key={m.id} className={`match-item${matchId === m.id ? " selected" : ""}`} onClick={() => { setMatchId(m.id); setMarketId(""); }}>
                  <div>
                    <div className="match-league">{m.league}</div>
                    <div className="match-teams">{m.home} vs {m.away}</div>
                  </div>
                  <div className="match-time">{m.time}</div>
                </div>
              ))}
            </div>

            {matchId && (
              <div style={{ display:"flex", flexDirection:"column", gap:12, animation:"toast-in 0.3s ease" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.08em" }}>Select Market</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {match?.markets.map(m => (
                    <button key={m.id} className={`btn ${marketId === m.id ? "btn-primary" : "btn-surface"} btn-md`} onClick={() => setMarketId(m.id)} style={{ flexDirection:"column", gap:2, alignItems:"flex-start", padding:"8px 12px", height:"auto" }}>
                      <span style={{ fontSize:11, fontWeight:700 }}>{m.name}</span>
                      <span style={{ fontSize:14, fontWeight:900 }}>{m.odds.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className={`btn btn-primary btn-xl btn-full mt-24${marketId ? " btn-pulse-red" : ""}`} disabled={!marketId} onClick={() => setStep(2)}>
              Review Trade <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <div style={{ animation:"toast-in 0.3s ease" }}>
            <h1 style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.02em", marginBottom:16 }}>Confirm Trade</h1>
            
            <div className="card-elevated" style={{ marginBottom:20 }}>
              <div className="slip-row">
                <span className="slip-label">Match</span>
                <span className="slip-value">{match?.home} vs {match?.away}</span>
              </div>
              <div className="slip-row">
                <span className="slip-label">Market</span>
                <span className="slip-value">{market?.name}</span>
              </div>
              <div className="slip-row">
                <span className="slip-label">Locked Odds</span>
                <div className="odds-pill">{odds.toFixed(2)}</div>
              </div>
              <div className="slip-row">
                <span className="slip-label">Risk Stake</span>
                <span className="slip-value">₦{FIXED_STAKE.toLocaleString()}</span>
              </div>
              <div className="slip-row" style={{ marginTop:8, borderTop:"2px dashed var(--border)", paddingTop:16 }}>
                <span className="slip-label" style={{ color:"#fff", fontWeight:700 }}>Potential Return</span>
                <span className="slip-value green" style={{ fontSize:16 }}>₦{potentialReturn.toLocaleString()}</span>
              </div>
            </div>

            <div className="info-box" style={{ marginBottom:16, background:"var(--red-surface)", borderColor:"rgba(232,0,28,0.2)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                <ShieldAlert size={14} color="var(--red)" />
                <span style={{ fontSize:11, fontWeight:700, color:"var(--red)", textTransform:"uppercase", letterSpacing:"0.05em" }}>Risk Checked</span>
              </div>
              <p style={{ color:"rgba(255,255,255,0.75)" }}>System Assigned Stake: ₦{FIXED_STAKE.toLocaleString()}. Calculated automatically based on your daily risk limit and current exposure.</p>
            </div>

            <button className={`btn btn-success btn-xl btn-full${!loading ? " btn-pulse-green" : ""}`} onClick={handleSubmit} disabled={loading}>
              {loading ? <span style={{ display:"inline-block", width:18, height:18, border:"2.5px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} /> : "CONFIRM TRADE"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
