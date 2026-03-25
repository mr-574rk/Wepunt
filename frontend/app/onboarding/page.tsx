"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, ChevronRight, Check, Banknote, Smartphone, Building2,
  Shield, Target, TrendingUp, ChevronLeft
} from "lucide-react";

const SLIDES = [
  { id: 0, title: "Welcome to WePunt", sub: "The first funded sports prop firm in Nigeria. Complete the challenge. Get funded. Keep the profits." },
  { id: 1, title: "Choose your username", sub: "This will appear on your leaderboard profile and funded certificate." },
  { id: 2, title: "Accept the rules", sub: "Read and accept the challenge rules before you begin." },
  { id: 3, title: "Select payout method", sub: "How should we pay you when you crush the challenge?" },
];

const PAYOUTS = [
  { id: "bank", icon: <Building2 size={20} color="var(--red)" />, name: "Bank Transfer", desc: "GTB, Access, Zenith & more" },
  { id: "opay", icon: <Smartphone size={20} color="var(--red)" />, name: "OPay / Palmpay", desc: "Instant mobile wallet" },
  { id: "crypto", icon: <Banknote size={20} color="var(--red)" />, name: "USDT (TRC-20)", desc: "Crypto payout" },
];

const HeroIllustration = ({ step }: { step: number }) => {
  const icons = [
    <div key="0" style={{ position: "relative", width: 80, height: 80 }}>
      <div style={{ width: 80, height: 80, background: "var(--red-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Zap size={36} color="var(--red)" fill="var(--red)" style={{ opacity: 0.9 }} />
      </div>
    </div>,
    <div key="1" style={{ width: 80, height: 80, background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Target size={36} color="var(--green)" />
    </div>,
    <div key="2" style={{ width: 80, height: 80, background: "var(--red-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Shield size={36} color="var(--red)" />
    </div>,
    <div key="3" style={{ width: 80, height: 80, background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TrendingUp size={36} color="var(--green)" />
    </div>,
  ];
  return icons[step] ?? icons[0];
};

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

  const next = () => {
    if (step < 3) setStep(step + 1);
    else router.push("/challenges");
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: "var(--red)", padding: "12px var(--pad)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          {step > 0
            ? <button onClick={() => setStep(step - 1)} style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>
                <ChevronLeft size={13} /> Back
              </button>
            : <div />
          }
          <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Step {step + 1} of 4</span>
          <button onClick={() => router.push("/challenges")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Skip</button>
        </div>
        <div className="steps-bar">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className={`step-seg ${s < step ? "done" : s === step ? "active" : ""}`} />
          ))}
        </div>
      </div>

      {/* Slide area */}
      <div style={{ flex: 1, padding: "32px var(--pad) 24px", display: "flex", flexDirection: "column" }}>
        {/* Illustration */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <HeroIllustration step={step} />
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>
          {SLIDES[step].title}
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 28 }}>
          {SLIDES[step].sub}
        </p>

        {/* Step 1: Username */}
        {step === 1 && (
          <div className="input-wrap">
            <label className="input-label">Username</label>
            <input
              className="input-field"
              type="text"
              placeholder="e.g. PuntKing_NG"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Only letters, numbers and underscores. Max 20 chars.</p>
          </div>
        )}

        {/* Step 2: Rules */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="info-box" style={{ marginBottom: 4 }}>
              <p style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, fontSize: 13 }}>Challenge Rules</p>
              {[
                "You must not exceed the max drawdown limit at any point.",
                "All bets are submitted by you and executed by our admins.",
                "You cannot influence stake sizes — they are system-assigned.",
                "Minimum 5 bets must be placed before passing evaluation.",
                "Profit split is 40% to you, 60% to WePunt on funded accounts.",
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: i < 4 ? 8 : 0 }}>
                  <Check size={13} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.55 }}>{r}</p>
                </div>
              ))}
            </div>
            <div className="check-wrap" onClick={() => setAgreed(!agreed)}>
              <div className={`check-box${agreed ? " checked" : ""}`}>
                {agreed && <Check size={13} color="#fff" strokeWidth={3} />}
              </div>
              <span className="check-label">I have read and agree to all WePunt challenge rules and trading conditions.</span>
            </div>
          </div>
        )}

        {/* Step 3: Payout */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PAYOUTS.map((p) => (
              <div key={p.id} className={`payout-opt${payout === p.id ? " selected" : ""}`} onClick={() => setPayout(p.id)}>
                <div className="payout-opt-icon">{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <p className="payout-opt-name">{p.name}</p>
                  <p className="payout-opt-desc">{p.desc}</p>
                </div>
                {payout === p.id && <Check size={16} color="var(--red)" strokeWidth={3} />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: "16px var(--pad)", borderTop: "1px solid var(--border)", background: "#fff" }}>
        {step === 0 && (
          <div style={{ background: "var(--bg-section)", borderRadius: "var(--r-md)", padding: "10px 14px", marginBottom: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", textAlign: "center" }}>
              Complete the challenge. Unlock your funded account. Keep <span style={{ color: "var(--green)" }}>40%</span> of the profits.
            </p>
          </div>
        )}
        <button
          className={`btn btn-primary btn-xl btn-full${canNext() ? " btn-pulse-red" : ""}`}
          onClick={next}
          disabled={!canNext()}
          style={{ opacity: canNext() ? 1 : 0.55 }}
        >
          {step === 3 ? "Finish Setup" : "Continue"}
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Dots */}
      <div className="dots" style={{ paddingBottom: 20, paddingTop: 8 }}>
        {[0, 1, 2, 3].map((s) => (
          <div key={s} className={`dot${s === step ? " active" : s < step ? " done" : ""}`} />
        ))}
      </div>
    </div>
  );
}
