"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, ChevronLeft, Upload, Lock, Check, Loader, Camera
} from "lucide-react";

const MATCHES = [
  "Arsenal vs Manchester City",
  "Chelsea vs Liverpool",
  "PSG vs Bayern Munich",
  "Real Madrid vs Barcelona",
  "Lakers vs Celtics",
  "Manchester United vs Tottenham",
];
const MARKETS = ["Home Win", "Away Win", "Draw", "Over 2.5 Goals", "Under 2.5 Goals", "Both Teams Score", "Asian Handicap"];

type BtnState = "idle" | "loading" | "success";

export default function SubmitBetPage() {
  const router = useRouter();
  const [match, setMatch] = useState("");
  const [market, setMarket] = useState("");
  const [odds, setOdds] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [btnState, setBtnState] = useState<BtnState>("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  const STAKE = "₦4,000";
  const canSubmit = match && market && odds && parseFloat(odds) > 1;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f.name);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setBtnState("loading");
    setTimeout(() => {
      setBtnState("success");
      setTimeout(() => router.push("/dashboard"), 1400);
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#fff" }}>
      {/* Header */}
      <div className="top-header">
        <button
          onClick={() => router.back()}
          style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}
        >
          <ChevronLeft size={14} /> Back
        </button>
        <div className="logo"><div className="logo-mark"><Zap size={16} color="#fff" fill="#fff" /></div>WePunt</div>
        <div style={{ width: 70 }} />
      </div>

      <div style={{ padding: "24px var(--pad)", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 4 }}>Submit a Bet</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Fill in the details. Our admins will execute this bet within minutes.</p>
        </div>

        {/* Match */}
        <div className="input-wrap">
          <label className="input-label">Match</label>
          <select className="select-field" value={match} onChange={(e) => setMatch(e.target.value)}>
            <option value="">Select a match...</option>
            {MATCHES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Market */}
        <div className="input-wrap">
          <label className="input-label">Market</label>
          <select className="select-field" value={market} onChange={(e) => setMarket(e.target.value)}>
            <option value="">Select market...</option>
            {MARKETS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Odds */}
        <div className="input-wrap">
          <label className="input-label">Your Odds</label>
          <input
            className="input-field"
            type="number"
            step="0.01"
            min="1.01"
            placeholder="e.g. 1.85"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            inputMode="decimal"
          />
        </div>

        {/* Locked Stake */}
        <div className="input-wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <label className="input-label">System Assigned Stake</label>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Lock size={11} color="var(--green)" />
              <span style={{ fontSize: 10, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Locked</span>
            </div>
          </div>
          <div className="locked-field">
            <span className="locked-value">{STAKE}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--green-light)", padding: "4px 10px", borderRadius: "var(--r-sm)", border: "1px solid rgba(0,166,81,0.2)" }}>
              <Lock size={12} color="var(--green)" />
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--green)" }}>System set</span>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>
            Stake size is determined by our risk system. You cannot change this.
          </p>
        </div>

        {/* Screenshot Upload */}
        <div className="input-wrap">
          <label className="input-label">Screenshot (Optional)</label>
          <div className="upload-box" onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={handleFile} />
            {file ? (
              <>
                <Check size={24} color="var(--green)" />
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>{file}</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Tap to change</p>
              </>
            ) : (
              <>
                <Camera size={28} color="var(--text-muted)" />
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>Tap to upload screenshot</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>JPG, PNG up to 5MB</p>
              </>
            )}
          </div>
        </div>

        {/* Potential Return */}
        {odds && parseFloat(odds) > 1 && (
          <div style={{ background: "var(--green-light)", border: "1px solid rgba(0,166,81,0.2)", borderRadius: "var(--r-md)", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Potential Return</span>
            <span style={{ fontSize: 20, fontWeight: 900, color: "var(--green)", letterSpacing: "-0.02em" }}>
              ₦{(4000 * parseFloat(odds || "1")).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
          </div>
        )}

        {/* Submit */}
        <button
          className={`btn btn-xl btn-full${canSubmit ? " btn-success btn-pulse-green" : " btn-ghost"}`}
          onClick={handleSubmit}
          disabled={!canSubmit || btnState !== "idle"}
          style={{ opacity: canSubmit ? 1 : 0.5, marginTop: 4, position: "relative" }}
        >
          {btnState === "idle" && "Submit Bet"}
          {btnState === "loading" && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              Submitting...
            </span>
          )}
          {btnState === "success" && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff" }}>
              <Check size={18} strokeWidth={3} /> Bet Submitted!
            </span>
          )}
        </button>

        <div className="info-box">
          <p>Bets are usually executed within <strong style={{ color: "var(--text-primary)" }}>5–10 minutes</strong>. You&apos;ll receive a notification once confirmed. Results are final once admin reviews the outcome.</p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
