import { useState } from "react";

interface LoginScreenProps {
  onLogin: (email: string) => void;
  onShowRegister: () => void;
}

export function LoginScreen({ onLogin, onShowRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-slate-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 w-[420px] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-400">
        <div className="text-center mb-7">
          <div className="inline-block mb-4">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-5xl font-black text-white">GHz</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 text-center mb-2 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-7">
          Sign in to your Gigahertz account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-xs mb-1.5 text-slate-900 dark:text-slate-100">
              Company Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-3.5 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl font-sans text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-all duration-200 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.1)] focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-xs mb-1.5 text-slate-900 dark:text-slate-100">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3.5 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl font-sans text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-all duration-200 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.1)] focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 text-white border-0 rounded-xl font-sans text-base font-bold cursor-pointer transition-all duration-200 mt-2 hover:bg-blue-800 hover:shadow-[0_6px_20px_rgba(26,86,232,0.35)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <a onClick={onShowRegister} className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
