"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Bell, User, Home, History, PlusCircle, BarChart2, AlertTriangle } from "lucide-react";

// Simple SVG sparkline from hardcoded equity points
const EQUITY = [200000,200800,199200,201500,203000,202400,205000,206200,204800,207000,208500,210000,211200,210000,212000,213400];
function SparkChart() {
  const W = 340; const H = 80;
  const min = Math.min(...EQUITY); const max = Math.max(...EQUITY);
  const range = max - min || 1;
  const pts = EQUITY.map((v, i) => {
    const x = (i / (EQUITY.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 12) - 4;
    return `${x},${y}`;
  }).join(" ");
  const lastX = W; const lastY = H - ((EQUITY[EQUITY.length-1] - min) / range) * (H-12) - 4;
  const areaPath = `M0,${H} L0,${H - ((EQUITY[0]-min)/range)*(H-12)-4} L${pts.split(" ").join(" L")} L${lastX},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:H, display:"block" }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#chartGrad)" className="chart-line" />
      <polyline points={pts} fill="none" stroke="#00E676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chart-line" />
      <circle cx={lastX} cy={lastY} r="4" fill="#00E676" />
    </svg>
  );
}

const RECENT = [
  { teams:"Arsenal vs Man City", market:"Home Win", odds:"1.85", stake:"₦4,000", pl:"+₦3,400", status:"won" },
  { teams:"PSG vs Bayern Munich", market:"Over 2.5 Goals", odds:"1.72", stake:"₦4,000", pl:"-₦4,000", status:"lost" },
  { teams:"Lakers vs Celtics", market:"Away Win", odds:"2.10", stake:"₦4,000", pl:"+₦4,400", status:"won" },
  { teams:"Chelsea vs Liverpool", market:"BTTS", odds:"1.65", stake:"₦4,000", pl:"—", status:"live" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [navTab, setNavTab] = useState("home");

  const accountSize = 200000;
  const equity = 213400;
  const profit = equity - accountSize;
  const target = 20000;
  const targetPct = Math.min((profit / target) * 100, 100);
  const dailyLoss = 2600; const dailyMax = 5000;
  const dailyPct = (dailyLoss / dailyMax) * 100;
  const drawdownUsed = 2600; const drawdownMax = 10000;
  const drawdownPct = (drawdownUsed / drawdownMax) * 100;
  const nearDailyLimit = dailyPct > 70;

  return (
    <div className="page-noPad">
      <div className="top-header">
        <div className="logo"><div className="logo-mark"><Zap size={15} color="#fff" fill="#fff" /></div>WePunt</div>
        <div style={{ display:"flex", gap:8 }}>
          <button style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><Bell size={15} color="var(--text-secondary)" /></button>
          <button style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><User size={15} color="var(--text-secondary)" /></button>
        </div>
      </div>

      {/* Live strip */}
      <div className="live-strip">
        <span><span className="live-dot" />LIVE</span>
        <span style={{ color:"var(--text-primary)", fontWeight:700 }}>Arsenal vs Man City</span><span style={{ color:"var(--green)" }}>1.85</span>
        <span style={{ color:"var(--text-primary)", fontWeight:700 }}>Lakers vs Celtics</span><span style={{ color:"var(--green)" }}>2.10</span>
        <span style={{ color:"var(--text-primary)", fontWeight:700 }}>PSG vs Bayern</span><span style={{ color:"var(--green)" }}>1.72</span>
      </div>

      <div style={{ padding:"14px var(--pad) 0" }}>
        {/* Wallet card */}
        <div className="wallet-card" style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative", zIndex:1 }}>
            <div>
              <p className="wallet-label">Account Size</p>
              <p style={{ fontSize:13, fontWeight:400, color:"rgba(255,255,255,0.4)", letterSpacing:"0.02em", marginBottom:2 }}>₦{accountSize.toLocaleString()}</p>
              <p className="wallet-label" style={{ marginTop:8 }}>Current Equity</p>
              <p className="wallet-amount">₦{equity.toLocaleString()}</p>
              <p className="wallet-sub" style={{ color:"var(--green)", fontWeight:700 }}>+₦{profit.toLocaleString()} today</p>
            </div>
            <div style={{ background:"rgba(232,0,28,0.2)", borderRadius:10, padding:"6px 12px", border:"1px solid rgba(232,0,28,0.3)", textAlign:"center" }}>
              <p style={{ fontSize:9, fontWeight:800, color:"var(--red)", textTransform:"uppercase", letterSpacing:"0.08em" }}>Challenge</p>
              <p style={{ fontSize:11, fontWeight:800, color:"var(--text-primary)", marginTop:2 }}>Day 16</p>
            </div>
          </div>
          {/* Equity chart */}
          <div className="chart-wrap" style={{ marginTop:14, position:"relative", zIndex:1 }}>
            <SparkChart />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:4, position:"relative", zIndex:1 }}>
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)" }}>Day 1</span>
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)" }}>Today</span>
          </div>
        </div>

        {/* Warning */}
        {nearDailyLimit && (
          <div className="warning-box" style={{ marginBottom:12 }}>
            <AlertTriangle size={16} color="#FF6B6B" />
            <p>Warning: Approaching daily loss limit — ₦{(dailyMax-dailyLoss).toLocaleString()} remaining</p>
          </div>
        )}

        {/* 6-metric grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
          {/* Target Progress */}
          <div className="stat-block" style={{ gridColumn:"span 2" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span className="stat-label">Target Progress</span>
              <span style={{ fontSize:12, fontWeight:800, color:"var(--green)" }}>₦{profit.toLocaleString()} / ₦{target.toLocaleString()}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width:`${targetPct}%` }} />
            </div>
            <p style={{ fontSize:10, color:"var(--text-muted)", marginTop:4 }}>{targetPct.toFixed(1)}% of 10% target reached</p>
          </div>

          {/* Daily Loss */}
          <div className="stat-block">
            <span className="stat-label">Daily Loss</span>
            <div className="stat-value" style={{ fontSize:16, color:nearDailyLimit?"var(--red)":"var(--text-primary)", marginBottom:4 }}>₦{dailyLoss.toLocaleString()}</div>
            <div className="progress-track" style={{ height:4 }}>
              <div className={`progress-fill${nearDailyLimit?" danger":""}`} style={{ width:`${dailyPct}%` }} />
            </div>
            <p style={{ fontSize:9, color:"var(--text-muted)", marginTop:3 }}>Max ₦{dailyMax.toLocaleString()}</p>
          </div>

          {/* Max Drawdown */}
          <div className="stat-block">
            <span className="stat-label">Drawdown Used</span>
            <div className="stat-value" style={{ fontSize:16, marginBottom:4 }}>₦{drawdownUsed.toLocaleString()}</div>
            <div className="progress-track" style={{ height:4 }}>
              <div className="progress-fill" style={{ width:`${drawdownPct}%` }} />
            </div>
            <p style={{ fontSize:9, color:"var(--text-muted)", marginTop:3 }}>Max ₦{drawdownMax.toLocaleString()}</p>
          </div>

          {/* Win Rate */}
          <div className="stat-block">
            <span className="stat-label">Win Rate</span>
            <div className="stat-value green">66.7%</div>
            <p style={{ fontSize:10, color:"var(--text-muted)", marginTop:3 }}>4 bets placed</p>
          </div>

          {/* Open Exposure */}
          <div className="stat-block">
            <span className="stat-label">Open Exposure</span>
            <div className="stat-value" style={{ fontSize:16 }}>₦4,000</div>
            <p style={{ fontSize:10, color:"var(--text-muted)", marginTop:3 }}>of ₦40,000 limit</p>
          </div>

          {/* Active Trades */}
          <div className="stat-block" style={{ display:"flex", flexDirection:"row", alignItems:"center", gap:12 }}>
            <div>
              <span className="stat-label">Active Trades</span>
              <div className="stat-value" style={{ fontSize:28 }}>1</div>
            </div>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--green)", boxShadow:"0 0 8px var(--green-glow)", flexShrink:0 }} />
          </div>
        </div>

        {/* Recent */}
        <div className="sh"><span className="sh-title">Recent Trades</span><span className="sh-link" onClick={() => router.push("/history")}>See All</span></div>
      </div>

      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", margin:"0 var(--pad)", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
        {RECENT.map((b,i) => (
          <div key={i} className="trade-row" style={{ borderBottom: i<RECENT.length-1?"1px solid var(--border)":"none" }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div className="trade-teams" style={{ textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap" }}>{b.teams}</div>
              <div className="trade-meta">{b.market} · {b.stake}</div>
            </div>
            <div className={`odds-pill${b.status==="won"?"":" neutral"}`}>{b.odds}</div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
              <span className={`badge badge-${b.status}`}>{b.status}</span>
              <span className={`pl-val ${b.pl.startsWith("+")?"pos":b.pl==="—"?"muted":"neg"}`}>{b.pl}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height:16 }} />

      <nav className="bottom-nav">
        <button className={`nav-item${navTab==="home"?" active":""}`} onClick={() => setNavTab("home")}><Home size={20} /><span>Home</span></button>
        <button className={`nav-item${navTab==="trades"?" active":""}`} onClick={() => { setNavTab("trades"); router.push("/history"); }}><History size={20} /><span>Trades</span></button>
        <button className="nav-item center-action" onClick={() => router.push("/submit-bet")}><div className="nav-center-circle"><PlusCircle size={22} color="#fff" /></div></button>
        <button className={`nav-item${navTab==="analytics"?" active":""}`} onClick={() => setNavTab("analytics")}><BarChart2 size={20} /><span>Analytics</span></button>
        <button className={`nav-item${navTab==="wallet"?" active":""}`} onClick={() => { setNavTab("wallet"); router.push("/funded"); }}><span style={{ fontSize:18 }}>₦</span><span>Funded</span></button>
      </nav>
    </div>
  );
}
