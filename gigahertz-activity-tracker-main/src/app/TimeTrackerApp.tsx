import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { Dashboard } from "./components/Dashboard";

export function TimeTrackerApp() {
  const [screen, setScreen] = useState<"login" | "register" | "app">("login");
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (email: string) => {
    setUser({ email, name: email.split("@")[0] });
    setScreen("app");
  };

  const handleRegister = (data: any) => {
    setUser(data);
    setScreen("app");
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("login");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-[1000] bg-transparent border-0 text-2xl cursor-pointer"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {screen === "login" && (
        <LoginScreen
          onLogin={handleLogin}
          onShowRegister={() => setScreen("register")}
        />
      )}

      {screen === "register" && (
        <RegisterScreen
          onRegister={handleRegister}
          onShowLogin={() => setScreen("login")}
        />
      )}

      {screen === "app" && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}
