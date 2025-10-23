"use client";

export default function TasksPage() {
  const tasks = [
    { id: 1, title: "Prepare Q4 Report", status: "In Progress" },
    { id: 2, title: "Weekly Meeting", status: "Completed" },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Task Management</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium">{task.title}</h3>
            <p
              className={`text-sm mt-1 ${
                task.status === "Completed"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {task.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
