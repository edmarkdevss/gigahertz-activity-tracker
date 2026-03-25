import { LayoutDashboard, ListTodo, BarChart3, LogOut } from "lucide-react";

interface SidebarProps {
  user: any;
  activePage: string;
  onPageChange: (page: "dashboard" | "tasks" | "analytics") => void;
  onLogout: () => void;
}

export function Sidebar({ user, activePage, onPageChange, onLogout }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "Task Management", icon: ListTodo },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="w-[230px] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col py-5 flex-shrink-0">
      <div className="px-5 pb-6 border-b border-slate-200 dark:border-slate-700 mb-4">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto">
          <span className="text-4xl font-black text-white">GHz</span>
        </div>
      </div>

      <nav className="flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => onPageChange(item.id as any)}
              className={`flex items-center gap-2.5 px-5 py-3 mx-2.5 my-0.5 rounded-xl cursor-pointer text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto px-5 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-xs text-slate-600 dark:text-slate-400 mb-2.5 break-all opacity-60">
          LOGGED IN AS
        </div>
        <div className="text-[11px] text-slate-600 dark:text-slate-400 mb-2.5 break-all">
          {user.email}
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-500 dark:text-red-400 text-xs font-semibold cursor-pointer py-1.5 border-0 bg-transparent font-sans transition-opacity duration-200 hover:opacity-70"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
