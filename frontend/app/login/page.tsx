"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, Eye, EyeOff, Phone, Lock, ArrowRight, ChevronLeft,
  ShieldCheck, RefreshCw
} from "lucide-react";

type Screen = "login" | "register" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("login");
  const [showPwd, setShowPwd] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (screen === "otp") {
      const t = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
      return () => clearInterval(t);
    }
  }, [screen]);

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 3) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (screen === "login") { router.push("/dashboard"); return; }
      if (screen === "register") { setCountdown(60); setScreen("otp"); return; }
      if (screen === "otp") { router.push("/onboarding"); }
    }, 1200);
  };

  return (
    <div className="page-auth" style={{ minHeight: "100dvh", overflowY: "auto" }}>
      {/* Red Header Band */}
      <div style={{
        background: "var(--red)",
        padding: screen === "otp" ? "16px var(--pad) 14px" : "32px var(--pad) 28px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: screen === "otp" ? 8 : 16
      }}>
        {screen !== "login" && (
          <button
            onClick={() => setScreen(screen === "otp" ? "register" : "login")}
            style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}
          >
            <ChevronLeft size={14} /> Back
          </button>
        )}
        <div className="logo">
          <div className="logo-mark"><Zap size={18} color="#fff" fill="#fff" /></div>
          WePunt
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500 }}>
            {screen === "login" && "Sign in to your account"}
            {screen === "register" && "Create your account"}
            {screen === "otp" && `Code sent to +234 ${phone}`}
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div style={{ flex: 1, padding: "24px var(--pad)", background: "#fff" }}>

        {/* ── OTP SCREEN ── */}
        {screen === "otp" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <ShieldCheck size={20} color="var(--red)" />
                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>Verify your number</span>
              </div>
              <div className="otp-grid">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    className="otp-cell"
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                  />
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              {countdown > 0 ? (
                <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
                  Resend code in <strong style={{ color: "var(--red)" }}>0:{countdown.toString().padStart(2, "0")}</strong>
                </span>
              ) : (
                <button
                  onClick={() => { setCountdown(60); setOtp(["","","",""]); }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--red)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                >
                  <RefreshCw size={13} /> Resend OTP
                </button>
              )}
            </div>
            <button
              className={`btn btn-primary btn-xl btn-full${otp.every(Boolean) ? " btn-pulse-red" : ""}`}
              onClick={handleSubmit}
              disabled={loading || !otp.every(Boolean)}
              style={{ opacity: !otp.every(Boolean) ? 0.6 : 1 }}
            >
              {loading ? <span style={{ display: "inline-block", width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> : <>Verify & Continue <ArrowRight size={16} /></>}
            </button>
          </div>
        )}

        {/* ── LOGIN / REGISTER ── */}
        {screen !== "otp" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="input-wrap">
              <label className="input-label">Phone Number</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
                  <Phone size={16} color="var(--text-muted)" />
                </span>
                <input
                  className="input-field"
                  style={{ paddingLeft: 40 }}
                  type="tel"
                  inputMode="tel"
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="input-wrap">
              <label className="input-label">Password</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
                  <Lock size={16} color="var(--text-muted)" />
                </span>
                <input
                  className="input-field"
                  style={{ paddingLeft: 40, paddingRight: 44 }}
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => setShowPwd(!showPwd)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: 0 }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {screen === "login" && (
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--red)", cursor: "pointer" }}>Forgot password?</span>
              </div>
            )}

            <button
              className="btn btn-primary btn-xl btn-full btn-pulse-red"
              style={{ marginTop: 8 }}
              onClick={handleSubmit}
              disabled={loading || !phone || !password}
            >
              {loading
                ? <span style={{ display: "inline-block", width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                : screen === "login"
                  ? <><span>Login</span><ArrowRight size={16} /></>
                  : <><span>Create Account</span><ArrowRight size={16} /></>
              }
            </button>

            <div className="divider" />

            <div style={{ textAlign: "center" }}>
              {screen === "login" ? (
                <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
                  Don&apos;t have an account?{" "}
                  <strong style={{ color: "var(--red)", cursor: "pointer" }} onClick={() => setScreen("register")}>
                    Create one
                  </strong>
                </span>
              ) : (
                <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
                  Already have an account?{" "}
                  <strong style={{ color: "var(--red)", cursor: "pointer" }} onClick={() => setScreen("login")}>
                    Login
                  </strong>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Terms */}
      <div style={{ padding: "14px var(--pad)", background: "var(--bg)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6 }}>
          By continuing, you agree to WePunt&apos;s{" "}
          <span style={{ color: "var(--red)", fontWeight: 600 }}>Terms of Service</span>{" "}
          and <span style={{ color: "var(--red)", fontWeight: 600 }}>Privacy Policy</span>.
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
