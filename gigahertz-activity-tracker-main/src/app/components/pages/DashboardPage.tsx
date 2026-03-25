import { useState, useEffect } from "react";
import { Clock, Play, Square, Calendar } from "lucide-react";
import { format } from "date-fns";

interface TimeEntry {
  id: number;
  task: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

export function DashboardPage() {
  const [selectedTask, setSelectedTask] = useState("");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(["Development", "Meeting", "Code Review", "Testing"]);
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recentEntries, setRecentEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    let interval: any;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (selectedTask) {
      setIsTracking(true);
      setCurrentTask(selectedTask);
      setStartTime(new Date());
      setElapsedTime(0);
    }
  };

  const handleStop = () => {
    if (startTime) {
      const entry: TimeEntry = {
        id: Date.now(),
        task: currentTask,
        startTime,
        endTime: new Date(),
        duration: elapsedTime,
      };
      setRecentEntries([entry, ...recentEntries]);
      setIsTracking(false);
      setCurrentTask("");
      setStartTime(null);
      setElapsedTime(0);
    }
  };

  const addTask = () => {
    if (newTask && !tasks.includes(newTask)) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const totalToday = recentEntries.reduce((sum, entry) => sum + entry.duration, 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{format(new Date(), "EEEE, MMMM d, yyyy")}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-tight">
            {formatTime(totalToday)}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Today's Total</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-2">
            <Play className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
            {recentEntries.length}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Tasks Completed</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
            {tasks.length}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Available Tasks</div>
        </div>
      </div>

      {/* Time Tracker */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-5">
        <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-slate-100">Time Tracker</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
          Select a task and start tracking your time
        </p>

        {!isTracking ? (
          <>
            <div className="flex gap-2.5 mb-3.5 items-center">
              <div className="flex-1 relative">
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  className="w-full px-3.5 py-3 pr-10 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none cursor-pointer appearance-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.08)] focus:bg-white dark:focus:bg-slate-800"
                >
                  <option value="">Select a task...</option>
                  {tasks.map((task) => (
                    <option key={task} value={task}>
                      {task}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 dark:text-slate-400">
                  ▼
                </div>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">or</span>
              <button
                onClick={addTask}
                className="px-4 py-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-0 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition-colors duration-200 hover:bg-blue-200 dark:hover:bg-blue-900/50"
              >
                + Add New
              </button>
            </div>

            <div className="flex gap-2 mb-2.5 items-center">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New task name..."
                className="flex-1 px-3 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-xs outline-none bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors duration-200 focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.08)] focus:bg-white dark:focus:bg-slate-800"
              />
              <button
                onClick={addTask}
                className="px-4 py-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-0 rounded-lg text-xs font-bold cursor-pointer transition-colors duration-200 hover:bg-blue-200 dark:hover:bg-blue-900/50"
              >
                Add Task
              </button>
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedTask}
              className="px-6 py-3 bg-blue-600 text-white border-0 rounded-xl text-sm font-bold cursor-pointer transition-colors duration-200 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Start Tracking
            </button>
          </>
        ) : (
          <div>
            <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-4 mb-3.5">
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1">
                CURRENTLY TRACKING
              </div>
              <div className="text-base font-bold my-1 text-slate-900 dark:text-slate-100">
                {currentTask}
              </div>
              <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-tight mb-0.5">
                {formatTime(elapsedTime)}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Started at {startTime ? format(startTime, "h:mm a") : ""}
              </div>
            </div>

            <button
              onClick={handleStop}
              className="w-full py-3.5 bg-red-500 dark:bg-red-600 text-white border-0 rounded-xl text-base font-bold cursor-pointer flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-red-600 dark:hover:bg-red-700"
            >
              <Square className="w-5 h-5" />
              Stop Tracking
            </button>
          </div>
        )}
      </div>

      {/* Recent Entries */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-bold mb-4 text-slate-900 dark:text-slate-100">
          Recent Time Entries
        </h3>

        <div className="max-h-[400px] overflow-y-auto pr-2">
          {recentEntries.length === 0 ? (
            <div className="text-center py-12 text-slate-600 dark:text-slate-400 text-sm">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-40" />
              No time entries yet
            </div>
          ) : (
            recentEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
              >
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {entry.task}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {format(entry.startTime, "h:mm a")} -{" "}
                    {entry.endTime ? format(entry.endTime, "h:mm a") : ""}
                  </div>
                </div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono bg-blue-100 dark:bg-blue-900/30 px-2.5 py-1 rounded-md">
                  {formatTime(entry.duration)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}