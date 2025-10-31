"use client";

import CountUp from "react-countup";
import { Tooltip } from "react-tooltip"; // Optional: can use your preferred tooltip library

interface StatCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
  tooltipText?: string;
}

export default function StatCard({ title, value, icon, color = "bg-blue-600", tooltipText }: StatCardProps) {
  return (
    <div
      className={`flex items-center p-4 rounded-xl shadow-md hover:shadow-lg transition ${color} text-white relative`}
      data-tooltip-id={tooltipText ? title : undefined}
      data-tooltip-content={tooltipText || ""}
    >
      {icon && <div className="mr-4 text-2xl">{icon}</div>}
      <div>
        <p className="text-2xl font-bold">
          <CountUp end={value} duration={1.5} separator="," />
        </p>
        <p className="text-sm">{title}</p>
      </div>

      {tooltipText && <Tooltip id={title} />}
    </div>
  );
}

