import { FC } from "react";
import { DensityRulesResult } from "../hooks/use-density-rules";
import clsx from "clsx";
import { format } from "date-fns/format";

export interface DayActivityProps {
  commits: number;
  density: keyof DensityRulesResult;
  date: Date;
}

export const bgByDensity: Record<keyof DensityRulesResult, string> = {
  darkest: "bg-green-900",
  darker: "bg-green-600",
  base: "bg-green-400",
  lighter: "bg-green-200",
  lightest: "bg-transparent",
};

export const DayActivity: FC<DayActivityProps> = ({
  commits,
  density,
  date,
}) => {
  return (
    <div
      className={clsx(
        "h-4 w-4 rounded",
        bgByDensity[density],
        /* When no activity, we add a border to the activity box */
        density === "lightest" && "border border-gray-500"
      )}
      /* I don't feel like adding a library to manage pluralization so I'm manually handling it */
      title={`${commits || "No"} contribution${
        commits > 1 ? "s" : ""
      } on ${format(date, "PPPP")}`}
    />
  );
};
