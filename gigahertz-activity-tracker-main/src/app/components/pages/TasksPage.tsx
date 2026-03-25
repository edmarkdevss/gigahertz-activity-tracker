import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Task {
  id: number;
  name: string;
  status: "active" | "completed";
}

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Development", status: "active" },
    { id: 2, name: "Meeting", status: "active" },
    { id: 3, name: "Code Review", status: "active" },
    { id: 4, name: "Testing", status: "active" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskName, setTaskName] = useState("");

  const activeTasks = tasks.filter((t) => t.status === "active");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const handleAdd = () => {
    if (taskName) {
      if (editingTask) {
        setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, name: taskName } : t)));
      } else {
        setTasks([...tasks, { id: Date.now(), name: taskName, status: "active" }]);
      }
      setShowModal(false);
      setTaskName("");
      setEditingTask(null);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTaskName(task.name);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleStatus = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === "active" ? "completed" : "active" } : t
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Task Management
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Manage your work tasks
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setTaskName("");
            setShowModal(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white border-0 rounded-xl text-sm font-bold cursor-pointer transition-colors duration-200 hover:bg-blue-800"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-slate-600 dark:text-slate-400 text-xs">Total Tasks:</span>
          <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
            {tasks.length}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>Active Tasks</span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
              {activeTasks.length}
            </span>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 dark:text-slate-400 px-3 py-2.5 border-b border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                  Task Name
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 dark:text-slate-400 px-3 py-2.5 border-b border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-slate-600 dark:text-slate-400 px-3 py-2.5 border-b border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {activeTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-3 py-3 text-sm border-b border-slate-200 dark:border-slate-700">
                    {task.name}
                  </td>
                  <td className="px-3 py-3 text-sm border-b border-slate-200 dark:border-slate-700">
                    <span className="inline-block px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-md font-semibold">
                      Active
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm border-b border-slate-200 dark:border-slate-700 text-right">
                    <button
                      onClick={() => handleEdit(task)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-0 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-1.5 transition-opacity duration-200 hover:opacity-80"
                    >
                      <Edit className="w-3.5 h-3.5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-0 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 transition-opacity duration-200 hover:opacity-80"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/45 dark:bg-black/60 z-[500] flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 w-[420px] shadow-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-250">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full border-0 bg-slate-100 dark:bg-slate-700 cursor-pointer flex items-center justify-center text-slate-600 dark:text-slate-400 text-lg transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-extrabold mb-1.5 text-slate-900 dark:text-slate-100">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5">
              {editingTask ? "Update task details" : "Create a new task for tracking"}
            </p>

            <div className="mb-4">
              <label className="block font-semibold text-xs mb-1.5 text-slate-900 dark:text-slate-100">
                Task Name
              </label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                className="w-full px-3.5 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,232,0.1)] focus:bg-white dark:focus:bg-slate-800"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-2.5 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-sm font-semibold cursor-pointer bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-5 py-2.5 bg-blue-600 text-white border-0 rounded-xl text-sm font-bold cursor-pointer transition-colors duration-200 hover:bg-blue-800"
              >
                {editingTask ? "Update" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
