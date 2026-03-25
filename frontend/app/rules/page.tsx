"use client";
import { useRouter } from "next/navigation";
import { Zap, ChevronLeft, Shield, AlertTriangle, ArrowRightCircle, Target, Clock, TrendingDown } from "lucide-react";

export default function RulesPage() {
  const router = useRouter();

  return (
    <div className="page-noPad">
      <div className="top-header">
        <button onClick={() => router.back()} style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 10px", color:"var(--text-secondary)", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:12, fontWeight:600, fontFamily:"inherit" }}>
          <ChevronLeft size={13} /> Back
        </button>
        <span style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.85)", letterSpacing:"0.02em" }}>Trading Rules</span>
        <div style={{ width:70 }} />
      </div>

      <div style={{ padding:"24px var(--pad) 40px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <Shield size={22} color="var(--red)" />
          <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.02em" }}>Evaluation Rules</h1>
        </div>
        <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.6, marginBottom:28 }}>
          To maintain a fair and professional trading environment, all WePunt traders must adhere to the following risk management parameters. <strong style={{ color:"var(--red)" }}>Breaching these rules results in immediate account failure.</strong>
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          
          <div className="card-elevated" style={{ padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <TrendingDown size={18} color="#FF6B6B" />
              <h2 style={{ fontSize:16, fontWeight:800 }}>5% Daily Loss Limit</h2>
            </div>
            <p style={{ fontSize:12, color:"var(--text-muted)", lineHeight:1.55 }}>
              Your account equity must not drop below 95% of your starting balance for that day. This is calculated at 00:00 UTC daily.
            </p>
          </div>

          <div className="card-elevated" style={{ padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <AlertTriangle size={18} color="var(--red)" />
              <h2 style={{ fontSize:16, fontWeight:800 }}>10% Max Drawdown</h2>
            </div>
            <p style={{ fontSize:12, color:"var(--text-muted)", lineHeight:1.55 }}>
              Your account equity must not drop below 90% of your initial starting balance at any point during your trading period.
            </p>
          </div>

          <div className="card-elevated" style={{ padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <Target size={18} color="var(--green)" />
              <h2 style={{ fontSize:16, fontWeight:800 }}>10% Profit Target</h2>
            </div>
            <p style={{ fontSize:12, color:"var(--text-muted)", lineHeight:1.55 }}>
              You must achieve a 10% profit on your starting balance to pass the evaluation phase and become a funded trader.
            </p>
          </div>

          <div className="card-elevated" style={{ padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <Clock size={18} color="var(--gold)" />
              <h2 style={{ fontSize:16, fontWeight:800 }}>Trading Restrictions</h2>
            </div>
            <ul style={{ fontSize:12, color:"var(--text-muted)", lineHeight:1.6, paddingLeft:16, display:"flex", flexDirection:"column", gap:6 }}>
              <li><strong>Min Odds:</strong> 1.50</li>
              <li><strong>Max Odds:</strong> 5.00</li>
              <li><strong>Max Bets:</strong> 5 trades open per day</li>
              <li><strong>Max Stake:</strong> System locked to ~3% risk</li>
              <li><strong>Minimum Trading Days:</strong> 20 active days</li>
            </ul>
          </div>

        </div>

        <div className="info-box" style={{ marginTop:24, background:"var(--bg-surface-2)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
            <ArrowRightCircle size={14} color="var(--text-primary)" />
            <span style={{ fontSize:11, fontWeight:700, color:"var(--text-primary)", textTransform:"uppercase", letterSpacing:"0.05em" }}>Execution Engine</span>
          </div>
          <p style={{ fontSize:12, color:"var(--text-secondary)", lineHeight:1.6 }}>
            All trades are submitted to the WePunt ledger and manually executed by our risk team in real-world markets. The odds displayed at the time of your submission are firmly locked in.
          </p>
        </div>

      </div>
    </div>
  );
}
