"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, Trophy, ArrowDownCircle, Shield, CheckCircle,
  Home, Clock, PlusCircle, BarChart2, Wallet,
  ChevronRight, Star, AlertCircle
} from "lucide-react";

export default function FundedPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const fundedBalance = 200000;
  const currentProfit = 13400;
  const drawdownRemaining = 29400;
  const withdrawable = Math.max(currentProfit * 0.4, 0);

  const handleWithdraw = () => {
    if (!amount || !account || parseFloat(amount) < 5000) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1600);
  };

  return (
    <div className="page-noPad" style={{ background: "var(--bg)" }}>
      {/* Header — gold accent */}
      <div style={{
        background: "linear-gradient(135deg, #1A1100 0%, #3B2500 60%, #5A3800 100%)",
        padding: "0 var(--pad)",
        height: "var(--header-h)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 16px rgba(212,160,23,0.25)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff" }}>
          <div style={{ width: 32, height: 32, background: "rgba(212,160,23,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212,160,23,0.35)" }}>
            <Star size={16} color="var(--gold)" fill="var(--gold)" />
          </div>
          WePunt
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: "var(--r-full)", padding: "4px 12px" }}>
          <Trophy size={13} color="var(--gold)" />
          <span style={{ fontSize: 11, fontWeight: 800, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Funded</span>
        </div>
      </div>

      <div style={{ padding: "16px var(--pad) 0" }}>
        {/* Funded Wallet Card */}
        <div className="wallet-card funded" style={{ marginBottom: 14, background: "linear-gradient(135deg, #1A1100 0%, #3B2500 60%, #5A3800 100%)", boxShadow: "0 4px 24px rgba(212,160,23,0.3)" }}>
          {/* Decorative circle */}
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(212,160,23,0.08)", pointerEvents: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
            <div>
              <p className="wallet-label">Funded Balance</p>
              <p className="wallet-amount" style={{ color: "var(--gold)" }}>₦{fundedBalance.toLocaleString()}</p>
              <p className="wallet-subtitle">
                <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>Active funded account</span>
              </p>
            </div>
            <div style={{ background: "rgba(212,160,23,0.15)", borderRadius: "var(--r-md)", padding: "8px 12px", border: "1px solid rgba(212,160,23,0.3)", textAlign: "center" }}>
              <Trophy size={22} color="var(--gold)" />
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(212,160,23,0.2)", margin: "16px 0", position: "relative", zIndex: 1 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, position: "relative", zIndex: 1 }}>
            {[
              { label: "Current Profit", value: `+₦${currentProfit.toLocaleString()}`, valueColor: "#4ade80" },
              { label: "Drawdown Left", value: `₦${drawdownRemaining.toLocaleString()}`, valueColor: "rgba(255,255,255,0.85)" },
              { label: "Withdrawable", value: `₦${withdrawable.toLocaleString()}`, valueColor: "var(--gold)" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(212,160,23,0.15)" : "none", paddingLeft: i > 0 ? 8 : 0 }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: s.valueColor, letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div className="stat-block" style={{ borderLeft: "3px solid var(--gold)" }}>
            <div className="stat-label">Win Rate</div>
            <div className="stat-value green">71.4%</div>
          </div>
          <div className="stat-block" style={{ borderLeft: "3px solid var(--green)" }}>
            <div className="stat-label">Bets Placed</div>
            <div className="stat-value">7</div>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="sh">
          <span className="sh-title">Withdrawal</span>
          <div className="badge badge-funded"><Trophy size={10} />40% split</div>
        </div>

        {done ? (
          <div style={{ background: "var(--green-light)", border: "1.5px solid rgba(0,166,81,0.3)", borderRadius: "var(--r-lg)", padding: "24px", textAlign: "center", marginBottom: 16 }}>
            <CheckCircle size={40} color="var(--green)" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontSize: 16, fontWeight: 800, color: "var(--green)", marginBottom: 4 }}>Withdrawal Requested!</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Your withdrawal of <strong>₦{parseFloat(amount).toLocaleString()}</strong> has been queued. Processing in 24–48 hrs.</p>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
            <div style={{ padding: "16px var(--pad)", borderBottom: "1px solid var(--border)" }}>
              {/* Withdrawable Amount display */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Withdrawable Profit (40%)</span>
                <span style={{ fontSize: 28, fontWeight: 900, color: "var(--green)", letterSpacing: "-0.03em" }}>
                  ₦{withdrawable.toLocaleString()}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="input-wrap">
                  <label className="input-label">Amount (₦)</label>
                  <input
                    className="input-field"
                    type="number"
                    inputMode="numeric"
                    placeholder="Min ₦5,000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="input-wrap">
                  <label className="input-label">Bank Account / Wallet</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="e.g. GTB 0123456789"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{ padding: "12px var(--pad)" }}>
              <button
                className={`btn btn-success btn-lg btn-full${amount && account && parseFloat(amount) >= 5000 ? " btn-pulse-green" : ""}`}
                onClick={handleWithdraw}
                disabled={loading || !amount || !account || parseFloat(amount) < 5000}
                style={{ opacity: amount && account && parseFloat(amount) >= 5000 ? 1 : 0.5 }}
              >
                {loading
                  ? <span style={{ display: "inline-block", width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  : <><ArrowDownCircle size={17} /> Withdraw Profit</>}
              </button>
            </div>
          </div>
        )}

        {/* Rules box */}
        <div className="info-box">
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <AlertCircle size={13} color="var(--text-muted)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Withdrawal Rules</span>
          </div>
          <p>
            Minimum withdrawal: <strong style={{ color: "var(--text-primary)" }}>₦5,000</strong><br />
            Profit split: <strong style={{ color: "var(--text-primary)" }}>40% to you / 60% to WePunt</strong><br />
            Processing time: <strong style={{ color: "var(--text-primary)" }}>24–48 business hours</strong><br />
            You must maintain a positive balance to remain funded.
          </p>
        </div>

        <div style={{ height: 16 }} />
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => router.push("/dashboard")}><Home size={20} /><span>Home</span></button>
        <button className="nav-item" onClick={() => router.push("/history")}><Clock size={20} /><span>History</span></button>
        <button className="nav-item center-action" onClick={() => router.push("/submit-bet")}>
          <div className="nav-center-circle"><PlusCircle size={24} color="#fff" /></div>
        </button>
        <button className="nav-item"><BarChart2 size={20} /><span>Stats</span></button>
        <button className="nav-item active"><Wallet size={20} /><span>Wallet</span></button>
      </nav>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
