import { useState } from "react";
import { X, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export function SignUpModal({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) {
  const { signUp, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      await signUp(name, email, password);
      onClose();
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreedToTerms(false);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Join BeanCraft</h2>
        <p className="text-gray-600 mb-6">Create your account and start earning rewards</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="John Doe"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="At least 6 characters"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg">
            <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Rewards Benefits
            </h3>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>• Earn stars with every purchase</li>
              <li>• Free birthday reward</li>
              <li>• Exclusive member offers</li>
            </ul>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-5 h-5 text-emerald-600 border-gray-300 rounded mt-0.5"
              disabled={isLoading}
            />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-emerald-700 hover:text-emerald-800 font-semibold">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-emerald-700 hover:text-emerald-800 font-semibold">
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-emerald-700 text-white rounded-full font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => {
                onClose();
                onSwitchToSignIn();
              }}
              className="text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}