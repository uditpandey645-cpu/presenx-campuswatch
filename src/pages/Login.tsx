import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4 shadow-lg shadow-primary/30">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary-foreground">PresenX</h1>
          <p className="text-primary-foreground/60 text-sm mt-1">Admin Portal • College Monitoring System</p>
        </div>

        {/* Login Card */}
        <div className="glass-dark rounded-2xl p-8 shadow-2xl">
          <h2 className="font-heading text-xl font-semibold text-primary-foreground mb-6">Welcome back</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@presenx.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-primary-foreground/60 cursor-pointer">
                <input type="checkbox" className="rounded border-primary-foreground/20 accent-primary" />
                Remember me
              </label>
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              Login as Admin
            </button>
          </form>
          <p className="text-center text-xs text-primary-foreground/40 mt-6">
            Protected by PresenX Security • v2.0
          </p>
        </div>
      </div>
    </div>
  );
}
