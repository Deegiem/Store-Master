"use client";

export default function TeamPage() {
  const team = [
    { id: 1, name: "Oluwatobi", status: "Active" },
    { id: 2, name: "Fatima", status: "On Leave" },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Team Overview</h1>
      <ul className="space-y-3">
        {team.map((m) => (
          <li
            key={m.id}
            className="flex justify-between bg-white shadow-sm border p-3 rounded-lg"
          >
            <span>{m.name}</span>
            <span
              className={`${
                m.status === "Active" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {m.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
