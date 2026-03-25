import { useState } from "react";
import { User } from "lucide-react";

interface RegisterScreenProps {
  onRegister: (data: any) => void;
  onShowLogin: () => void;
}

export function RegisterScreen({ onRegister, onShowLogin }: RegisterScreenProps) {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [faceScanned, setFaceScanned] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && email && password && password === password2) {
      setStep(2);
    }
  };

  const handleFaceScan = () => {
    // Simulate face scan
    setTimeout(() => {
      setFaceScanned(true);
      setTimeout(() => {
        onRegister({ firstName, lastName, email, name: `${firstName} ${lastName}` });
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-slate-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-y-auto py-8">
      {step === 1 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 w-[420px] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-400 my-8">
          <div className="text-center mb-7">
            <div className="inline-block mb-4">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-5xl font-black text-white">GHz</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 text-center mb-2 tracking-tight">
            Create Employee Account
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-7">
            Register to start tracking your work time
          </p>

          <form onSubmit={handleStep1Submit}>
            <div className="mb-4">
              <label className="block font-semibold text-xs mb-1.5 text-slate-900 dark:text-slate-100">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full px-3.5 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.1)] focus:bg-white dark:focus:bg-slate-800"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-xs mb-1.5 text-slate-900 dark:text-slate-100">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full px-3.5 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.1)] focus:bg-white dark:focus:bg-slate-800"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-xs mb-1.5 text-slate-900 dark:text-slate-100">
                Company Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.1)] focus:bg-white dark:focus:bg-slate-800"
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
                placeholder="Create a strong password"
                className="w-full px-3.5 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.1)] focus:bg-white dark:focus:bg-slate-800"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-xs mb-1.5 text-slate-900 dark:text-slate-100">
                Confirm Password
              </label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Repeat your strong password"
                className="w-full px-3.5 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.1)] focus:bg-white dark:focus:bg-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 text-white border-0 rounded-xl text-base font-bold cursor-pointer transition-all duration-200 mt-2 hover:bg-blue-800 hover:shadow-[0_6px_20px_rgba(26,86,232,0.35)] hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <a onClick={onShowLogin} className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline">
              Login
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 w-[420px] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-400">
          <div className="text-center mb-7">
            <div className="inline-block mb-4">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-5xl font-black text-white">GHz</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 text-center mb-2 tracking-tight">
            Face Recognition
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-7">
            Scan your face for secure authentication
          </p>

          <div className="flex justify-center my-2 mb-6">
            <div
              onClick={!faceScanned ? handleFaceScan : undefined}
              className={`w-52 h-52 rounded-full bg-slate-800 dark:bg-slate-700 flex flex-col items-center justify-center relative cursor-pointer transition-transform duration-200 overflow-hidden ${
                !faceScanned ? "hover:scale-105" : ""
              }`}
            >
              <div
                className={`absolute inset-1.5 rounded-full border-3 ${
                  faceScanned
                    ? "border-green-500 animate-none"
                    : "border-transparent border-t-cyan-400 border-r-cyan-400 border-b-blue-600 animate-spin"
                }`}
                style={{ animationDuration: "2.4s" }}
              ></div>
              <User
                className={`w-16 h-16 mb-2 z-10 ${
                  faceScanned ? "text-green-500" : "text-slate-500"
                }`}
              />
              <span
                className={`text-xs z-10 ${
                  faceScanned ? "text-green-500" : "text-slate-400"
                }`}
              >
                {faceScanned ? "✓ Verified" : "Click to scan"}
              </span>
            </div>
          </div>

          <div className="text-center text-sm text-slate-600 dark:text-slate-400">
            <a onClick={onShowLogin} className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline">
              ← Back to Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
