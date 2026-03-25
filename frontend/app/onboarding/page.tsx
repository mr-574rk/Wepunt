"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, ChevronRight, ChevronLeft, Check, Building2, Smartphone, Banknote, Shield, Target, TrendingUp } from "lucide-react";

const STEPS = [
  { title: "Unlock funded capital", sub: "Complete the challenge. Trade with firm money. Keep 40% of profits." },
  { title: "Choose your username", sub: "Your identity on the WePunt leaderboard and funded certificate." },
  { title: "Accept challenge rules", sub: "Read and acknowledge the evaluation rules before you begin." },
  { title: "Select payout method", sub: "Choose how we pay out your profit share." },
];
const PAYOUTS = [
  { id:"bank", icon:<Building2 size={18} color="var(--red)" />, name:"Bank Transfer", desc:"GTB, Access, Zenith & more" },
  { id:"opay", icon:<Smartphone size={18} color="var(--red)" />, name:"OPay / Palmpay", desc:"Instant mobile wallet" },
  { id:"usdt", icon:<Banknote size={18} color="var(--red)" />, name:"USDT (TRC-20)", desc:"Crypto payout" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [payout, setPayout] = useState("");

  const canNext = () => {
    if (step === 1 && !username.trim()) return false;
    if (step === 2 && !agreed) return false;
    if (step === 3 && !payout) return false;
    return true;
  };

  return (
    <div style={{ minHeight:"100dvh", background:"var(--bg)", display:"flex", flexDirection:"column" }}>
      {/* Header */}
      <div className="top-header">
        {step > 0
          ? <button onClick={() => setStep(step-1)} style={{ background:"var(--bg-surface)", border:"1px solid var(--border-2)", borderRadius:8, padding:"6px 10px", color:"var(--text-secondary)", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:12, fontWeight:600, fontFamily:"inherit" }}><ChevronLeft size={13} /> Back</button>
          : <div />}
        <div className="steps-bar" style={{ flex:1, maxWidth:140, margin:"0 16px" }}>
          {[0,1,2,3].map(s => <div key={s} className={`step-seg${s<step?" done":s===step?" active":""}`} />)}
        </div>
        <button onClick={() => router.push("/challenges")} style={{ background:"none", border:"none", color:"var(--text-muted)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Skip</button>
      </div>

      <div style={{ flex:1, padding:"28px var(--pad) 20px", display:"flex", flexDirection:"column" }}>
        {/* Illustration */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:24 }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background: step===1||step===3 ? "var(--green-surface)" : "var(--red-surface)", border:`1.5px solid ${step===1||step===3 ? "rgba(0,230,118,0.2)" : "rgba(232,0,28,0.2)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {step===0 && <Zap size={32} color="var(--red)" fill="var(--red)" style={{ opacity:0.85 }} />}
            {step===1 && <Target size={32} color="var(--green)" />}
            {step===2 && <Shield size={32} color="var(--red)" />}
            {step===3 && <TrendingUp size={32} color="var(--green)" />}
          </div>
        </div>

        {step === 0 && (
          <div style={{ marginBottom:24, background:"var(--bg-surface)", border:"1px solid var(--border-2)", borderRadius:"var(--r-lg)", padding:"18px 16px", textAlign:"center" }}>
            <p style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Funded Capital Available</p>
            <p style={{ fontSize:38, fontWeight:900, color:"var(--text-primary)", letterSpacing:"-0.04em", lineHeight:1 }}>₦200,000</p>
            <p style={{ fontSize:12, color:"var(--text-secondary)", marginTop:6 }}>Pass the challenge to unlock</p>
          </div>
        )}

        <h1 style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.02em", marginBottom:8, lineHeight:1.2 }}>{STEPS[step].title}</h1>
        <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.6, marginBottom:24 }}>{STEPS[step].sub}</p>

        {step === 1 && (
          <div className="input-wrap">
            <label className="input-label">Username</label>
            <input className="input-field" type="text" placeholder="e.g. AlphaTrader_NG" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
            <p style={{ fontSize:11, color:"var(--text-muted)" }}>Letters, numbers, underscores. Max 20 chars.</p>
          </div>
        )}

        {step === 2 && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div className="info-box">
              <p style={{ fontWeight:700, color:"var(--text-primary)", marginBottom:10, fontSize:13 }}>Evaluation Rules</p>
              {[
                "Never exceed the max drawdown limit at any time.",
                "Submit bets via the app — admins execute in real markets.",
                "Stakes are system-assigned. You cannot change them.",
                "Minimum 20 bets required. Maximum 5 bets per day.",
                "You have 30 days to hit the profit target.",
                "Profit split is 40% to you, 60% to WePunt on funded accounts.",
              ].map((r,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:i<5?8:0 }}>
                  <Check size={12} color="var(--green)" style={{ marginTop:2, flexShrink:0 }} />
                  <p style={{ fontSize:12, color:"var(--text-secondary)", lineHeight:1.55 }}>{r}</p>
                </div>
              ))}
            </div>
            <div className="check-wrap" onClick={() => setAgreed(!agreed)}>
              <div className={`check-box${agreed?" checked":""}`}>{agreed && <Check size={12} color="#fff" strokeWidth={3} />}</div>
              <span className="check-label">I have read and agree to all WePunt evaluation rules and conditions.</span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {PAYOUTS.map(p => (
              <div key={p.id} className={`payout-opt${payout===p.id?" selected":""}`} onClick={() => setPayout(p.id)}>
                <div className="payout-opt-icon">{p.icon}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)" }}>{p.name}</p>
                  <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:1 }}>{p.desc}</p>
                </div>
                {payout===p.id && <Check size={15} color="var(--red)" strokeWidth={3} />}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding:"14px var(--pad)", borderTop:"1px solid var(--border)" }}>
        <button className={`btn btn-primary btn-xl btn-full${canNext()?" btn-pulse-red":""}`} style={{ opacity:canNext()?1:0.45 }} disabled={!canNext()} onClick={() => { if(step<3) setStep(step+1); else router.push("/challenges"); }}>
          {step===3 ? "Finish Setup" : "Continue"} <ChevronRight size={16} />
        </button>
      </div>
      <div className="dots" style={{ paddingBottom:20, paddingTop:8 }}>
        {[0,1,2,3].map(s => <div key={s} className={`dot${s===step?" active":s<step?" done":""}`} />)}
      </div>
    </div>
  );
}
