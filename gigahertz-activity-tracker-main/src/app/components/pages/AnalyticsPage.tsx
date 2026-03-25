import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Clock, TrendingUp, Calendar } from "lucide-react";

export function AnalyticsPage() {
  const weeklyData = [
    { day: "Mon", hours: 7.5 },
    { day: "Tue", hours: 8.2 },
    { day: "Wed", hours: 6.8 },
    { day: "Thu", hours: 8.5 },
    { day: "Fri", hours: 7.2 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 0 },
  ];

  const taskData = [
    { name: "Development", value: 45, color: "#1a56e8" },
    { name: "Meetings", value: 25, color: "#22c55e" },
    { name: "Code Review", value: 20, color: "#7c3aed" },
    { name: "Testing", value: 10, color: "#f59e0b" },
  ];

  const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0);
  const avgDaily = totalHours / 5; // Work days only

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Analytics
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
          View your productivity insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium mb-2.5">
            <Clock className="w-4 h-4" />
            <span>Total This Week</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
            {totalHours.toFixed(1)}h
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium mb-2.5">
            <TrendingUp className="w-4 h-4" />
            <span>Daily Average</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
            {avgDaily.toFixed(1)}h
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium mb-2.5">
            <Calendar className="w-4 h-4" />
            <span>Working Days</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
            5
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-slate-100">
            Weekly Hours
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Time tracked per day
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="hours" fill="#1a56e8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-slate-100">
            Time by Task
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Distribution of work activities
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Tasks */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold mb-4 text-slate-900 dark:text-slate-100">
          Top Tasks This Week
        </h3>
        <div className="flex flex-col gap-2.5">
          {taskData.map((task) => (
            <div key={task.name} className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: task.color }}
              ></div>
              <div className="flex-1 text-xs font-medium text-slate-900 dark:text-slate-100">
                {task.name}
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                {task.value}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
