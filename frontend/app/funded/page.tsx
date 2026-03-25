"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Trophy, ArrowDownCircle, CheckCircle, Home, History, PlusCircle, BarChart2, Star, AlertCircle } from "lucide-react";

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
    <div className="page-noPad">
      {/* Header — Gold dark */}
      <div style={{
        background: "linear-gradient(135deg, #1A1100 0%, #3B2500 60%, #5A3800 100%)",
        padding: "0 var(--pad)", height: "var(--header-h)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 24px var(--gold-glow)", position: "sticky", top: 0, zIndex: 40
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff" }}>
          <div style={{ width: 30, height: 30, background: "rgba(255,209,102,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,209,102,0.3)" }}>
            <Star size={15} color="var(--gold)" fill="var(--gold)" />
          </div>
          WePunt
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,209,102,0.15)", border: "1px solid rgba(255,209,102,0.3)", borderRadius: "var(--r-full)", padding: "4px 10px" }}>
          <Trophy size={11} color="var(--gold)" />
          <span style={{ fontSize: 10, fontWeight: 800, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Funded Trader</span>
        </div>
      </div>

      <div style={{ padding: "16px var(--pad) 0" }}>
        {/* Funded Wallet Card */}
        <div className="wallet-card funded" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
            <div>
              <p className="wallet-label" style={{ color: "rgba(255,255,255,0.6)" }}>Funded Balance</p>
              <p className="wallet-amount gold">₦{fundedBalance.toLocaleString()}</p>
              <p className="wallet-sub"><span style={{ color: "#fff", fontWeight: 700 }}>Active Prop Firm Capital</span></p>
            </div>
            <div style={{ background: "rgba(255,209,102,0.15)", borderRadius: "var(--r-md)", padding: "8px 12px", border: "1px solid rgba(255,209,102,0.3)", textAlign: "center" }}>
              <Trophy size={20} color="var(--gold)" />
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(255,209,102,0.2)", margin: "18px 0", position: "relative", zIndex: 1 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, position: "relative", zIndex: 1 }}>
            {[
              { label: "Current Profit", value: `+₦${currentProfit.toLocaleString()}`, color: "var(--green)" },
              { label: "Drawdown Left", value: `₦${drawdownRemaining.toLocaleString()}`, color: "#fff" },
              { label: "Withdrawable", value: `₦${withdrawable.toLocaleString()}`, color: "var(--gold)" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(255,209,102,0.15)" : "none", paddingLeft: i > 0 ? 8 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: s.color, letterSpacing: "-0.01em" }}>{s.value}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="sh" style={{ marginBottom:14 }}>
          <span className="sh-title">Withdraw Profit</span>
          <div className="badge badge-funded" style={{ fontSize:9 }}><Trophy size={10} />40% split</div>
        </div>

        {done ? (
          <div style={{ background: "var(--green-surface)", border: "1.5px solid var(--green)", borderRadius: "var(--r-lg)", padding: "24px", textAlign: "center", marginBottom: 16, boxShadow: "var(--shadow-green)" }}>
            <CheckCircle size={36} color="var(--green)" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Payout Requested!</p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight:1.5 }}>Your split of <strong>₦{parseFloat(amount).toLocaleString()}</strong> is queued. Processing takes 24–48 hrs.</p>
          </div>
        ) : (
          <div className="card" style={{ padding:0, marginBottom: 16 }}>
            <div style={{ padding: "16px var(--pad)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>Available to withdraw</span>
                <span style={{ fontSize: 24, fontWeight: 900, color: "var(--green)", letterSpacing: "-0.03em" }}>
                  ₦{withdrawable.toLocaleString()}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="input-wrap">
                  <label className="input-label">Amount (₦)</label>
                  <input className="input-field" type="number" inputMode="numeric" placeholder="Min ₦5,000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="input-wrap">
                  <label className="input-label">Bank Account / Wallet</label>
                  <input className="input-field" type="text" placeholder="e.g. GTB 0123456789" value={account} onChange={(e) => setAccount(e.target.value)} />
                </div>
              </div>
            </div>
            <div style={{ padding: "12px var(--pad)" }}>
              <button
                className={`btn btn-success btn-lg btn-full${amount && account && parseFloat(amount) >= 5000 ? " btn-pulse-green" : ""}`}
                onClick={handleWithdraw} disabled={loading || !amount || !account || parseFloat(amount) < 5000}
                style={{ opacity: amount && account && parseFloat(amount) >= 5000 ? 1 : 0.4 }}
              >
                {loading ? <span style={{ display:"inline-block", width:18, height:18, border:"2.5px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} /> : <><ArrowDownCircle size={16} /> Request Withdrawal</>}
              </button>
            </div>
          </div>
        )}

        {/* Rules box */}
        <div className="info-box" style={{ background:"var(--bg-surface-2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <AlertCircle size={13} color="var(--text-muted)" />
            <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Withdrawal Terms</span>
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6 }}>
            Minimum withdrawal: <strong style={{ color: "var(--text-primary)" }}>₦5,000</strong><br />
            Profit split: <strong style={{ color: "var(--text-primary)" }}>40% Trader / 60% WePunt</strong><br />
            Processing time: <strong style={{ color: "var(--text-primary)" }}>24–48 hours</strong><br />
            Warning: You must maintain a positive balance to remain funded.
          </p>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => router.push("/dashboard")}><Home size={20} /><span>Home</span></button>
        <button className="nav-item" onClick={() => router.push("/history")}><History size={20} /><span>Trades</span></button>
        <button className="nav-item center-action" onClick={() => router.push("/submit-bet")}><div className="nav-center-circle"><PlusCircle size={22} color="#fff" /></div></button>
        <button className="nav-item"><BarChart2 size={20} /><span>Analytics</span></button>
        <button className="nav-item active"><span style={{ fontSize:18 }}>₦</span><span>Funded</span></button>
      </nav>
    </div>
  );
}
