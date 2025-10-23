"use client";

export default function MyTasksPage() {
  const myTasks = [
    { id: 1, title: "Update client sheet", due: "Today", done: false },
    { id: 2, title: "Sync with design team", due: "Tomorrow", done: true },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My Tasks</h1>
      <ul className="space-y-2">
        {myTasks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition"
          >
            <span
              className={t.done ? "line-through text-gray-400" : "text-gray-700"}
            >
              {t.title}
            </span>
            <span className="text-sm text-gray-500">{t.due}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
