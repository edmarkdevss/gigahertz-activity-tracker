import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardPage } from "./pages/DashboardPage";
import { TasksPage } from "./pages/TasksPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activePage, setActivePage] = useState<"dashboard" | "tasks" | "analytics">("dashboard");

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 via-slate-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Sidebar
        user={user}
        activePage={activePage}
        onPageChange={setActivePage}
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-y-auto p-8">
        {activePage === "dashboard" && <DashboardPage />}
        {activePage === "tasks" && <TasksPage />}
        {activePage === "analytics" && <AnalyticsPage />}
      </main>
    </div>
  );
}
