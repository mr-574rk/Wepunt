"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Search, Clock, CheckCircle, AlertCircle, Home, History, PlusCircle, BarChart2, ShieldAlert } from "lucide-react";

type TradeStatus = "pending-exec" | "live" | "won" | "lost";

const TRADES: {
  id: string; date: string; teams: string; market: string;
  odds: number; stake: number; status: TradeStatus; pl: number | null;
}[] = [
  { id:"t1", date:"Today, 14:30", teams:"Arsenal vs Man City", market:"Home Win", odds:1.85, stake:4000, status:"pending-exec", pl:null },
  { id:"t2", date:"Today, 12:00", teams:"Chelsea vs Liverpool", market:"BTTS", odds:1.65, stake:4000, status:"live", pl:null },
  { id:"t3", date:"24 Mar, 21:00", teams:"Lakers vs Celtics", market:"Away Win", odds:2.10, stake:4000, status:"won", pl:4400 },
  { id:"t4", date:"23 Mar, 19:45", teams:"PSG vs Bayern Munich", market:"Over 2.5 Goals", odds:1.72, stake:4000, status:"lost", pl:-4000 },
  { id:"t5", date:"23 Mar, 16:30", teams:"Real Madrid vs Barcelona", market:"Home Win", odds:1.95, stake:4000, status:"won", pl:3800 },
];

export default function TradesPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"open" | "history">("open");
  const [search, setSearch] = useState("");

  const filtered = TRADES.filter(t => {
    if (tab === "open" && t.status !== "pending-exec" && t.status !== "live") return false;
    if (tab === "history" && t.status !== "won" && t.status !== "lost") return false;
    if (search && !t.teams.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (s: TradeStatus) => {
    switch(s) {
      case "pending-exec": return <span className="badge badge-pending-exec"><Clock size={10} /> Pending Execution</span>;
      case "live": return <span className="badge badge-live"><Zap size={10} /> Live</span>;
      case "won": return <span className="badge badge-won"><CheckCircle size={10} /> Settled Won</span>;
      case "lost": return <span className="badge badge-lost"><AlertCircle size={10} /> Settled Lost</span>;
    }
  };

  return (
    <div className="page-noPad">
      <div className="top-header">
        <div className="logo"><div className="logo-mark"><Zap size={15} color="#fff" fill="#fff" /></div>WePunt</div>
        <span style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.85)", letterSpacing:"0.02em" }}>Trades</span>
        <div style={{ width:70 }} />
      </div>

      <div style={{ padding:"16px var(--pad) 0" }}>
        {/* Toggle */}
        <div className="tab-toggle" style={{ marginBottom:16 }}>
          <button className={`tab-tog-item${tab==="open"?" active":""}`} onClick={() => setTab("open")}>Open Trades (2)</button>
          <button className={`tab-tog-item${tab==="history"?" active":""}`} onClick={() => setTab("history")}>History (18)</button>
        </div>

        {/* Search */}
        <div style={{ position:"relative", marginBottom:16 }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", display:"flex" }}><Search size={15} color="var(--text-muted)" /></span>
          <input className="input-field" style={{ paddingLeft:40, height:44, fontSize:13 }} type="text" placeholder="Search match..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Ledger */}
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
          {filtered.length === 0 && (
            <div style={{ padding:"32px", textAlign:"center", color:"var(--text-muted)", fontSize:13 }}>No trades found</div>
          )}
          {filtered.map((t, i) => (
            <div key={t.id} style={{ padding:"14px var(--pad)", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", display:"flex", flexDirection:"column", gap:10 }}>
              
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="trade-meta" style={{ marginBottom:4 }}>{t.date}</div>
                  <div className="trade-teams" style={{ textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap" }}>{t.teams}</div>
                </div>
                {getStatusBadge(t.status)}
              </div>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase" }}>{t.market}</span>
                  <div className={`odds-pill${tab==="history"&&t.status==="lost"?" neutral":""}`}>{t.odds.toFixed(2)}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:2, fontWeight:500 }}>Risk: ₦{t.stake.toLocaleString()}</div>
                  {t.pl !== null ? (
                    <div className={`pl-val ${t.pl >= 0 ? "pos" : "neg"}`} style={{ fontSize:15 }}>
                      {t.pl >= 0 ? `+₦${t.pl.toLocaleString()}` : `-₦${Math.abs(t.pl).toLocaleString()}`}
                    </div>
                  ) : (
                    <div style={{ fontSize:13, fontWeight:800, color:"var(--text-primary)" }}>
                      To Win: <span className="green">₦{(t.stake * t.odds - t.stake).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {t.status === "pending-exec" && (
                <div style={{ marginTop:4, display:"flex", alignItems:"center", gap:6, padding:"6px 10px", background:"rgba(232,0,28,0.08)", borderRadius:6, border:"1px solid rgba(232,0,28,0.15)" }}>
                  <ShieldAlert size={11} color="var(--red)" />
                  <span style={{ fontSize:10, color:"var(--red)", fontWeight:600 }}>Queued for manual execution</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 16 }} />

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => router.push("/dashboard")}><Home size={20} /><span>Home</span></button>
        <button className="nav-item active"><History size={20} /><span>Trades</span></button>
        <button className="nav-item center-action" onClick={() => router.push("/submit-bet")}><div className="nav-center-circle"><PlusCircle size={22} color="#fff" /></div></button>
        <button className="nav-item"><BarChart2 size={20} /><span>Analytics</span></button>
        <button className="nav-item" onClick={() => router.push("/funded")}><span style={{ fontSize:18 }}>₦</span><span>Funded</span></button>
      </nav>
    </div>
  );
}
