import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  memberSince: string;
  rewardsPoints: number;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would call an API
    setUser({
      email,
      name: email.split("@")[0],
      memberSince: "March 2026",
      rewardsPoints: 150,
    });
    setIsLoading(false);
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user creation
    setUser({
      email,
      name,
      memberSince: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      rewardsPoints: 0,
    });
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
