import { FC } from "react";
import { DensityRulesResult } from "../hooks/use-density-rules";
import clsx from "clsx";

export interface DayActivityProps {
  commits: number;
  density: keyof DensityRulesResult;
}

const bgByDensity: Record<keyof DensityRulesResult, string> = {
  darkest: "bg-green-900",
  darker: "bg-green-600",
  base: "bg-green-400",
  lighter: "bg-green-200",
  lightest: "bg-gray-100",
};

export const DayActivity: FC<DayActivityProps> = ({ commits, density }) => {
  return (
    <div
      className={clsx("h-4 w-4 rounded", bgByDensity[density])}
      /* TODO: pluralize? */
      title={`${commits || "No"} contribution${commits > 1 ? "s" : ""}`}
    />
  );
};
