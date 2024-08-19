import { FC } from "react";
import { DayActivity, DayActivityProps } from "./day-activity";
import { DensityRulesResult } from "../hooks/use-density-rules";

export interface WeekActivityProps {
  /* TODO: better name? */
  commitActivity: {
    total: number;
    week: number;
    days: number[];
  };
  densityRules: DensityRulesResult;
}

export const WeekActivity: FC<WeekActivityProps> = ({
  commitActivity,
  densityRules,
}) => {
  const getDensity = (commits: number): DayActivityProps["density"] => {
    if (commits < densityRules.lighter) return "lightest";
    if (commits < densityRules.base) return "lighter";
    if (commits < densityRules.darker) return "base";
    if (commits < densityRules.darkest) return "darker";
    return "darkest";
  };

  return (
    <div className="flex flex-col gap-2 p-1">
      {commitActivity.days.map((commits, idx) => (
        <DayActivity
          key={idx}
          commits={commits}
          density={getDensity(commits)}
        />
      ))}
    </div>
  );
};
