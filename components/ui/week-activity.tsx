import { FC } from "react";
import { DayActivity, DayActivityProps } from "./day-activity";
import { DensityRules } from "@/components/hooks/use-density-rules";
import { fromUnixTime } from "date-fns/fromUnixTime";
import { addDays } from "date-fns/addDays";
import { isAfter } from "date-fns/isAfter";
import { format } from "date-fns/format";
import { CommitActivity } from "@/components/hooks/use-commit-activity";

export type WeekActivityProps = {
  commitActivity: CommitActivity;
  densityRules: DensityRules;
  showMonthLabel: boolean;
};

export const WeekActivity: FC<WeekActivityProps> = ({
  commitActivity,
  densityRules,
  showMonthLabel,
}) => {
  const getDensity = (commits: number): DayActivityProps["density"] => {
    if (commits < densityRules.lighter) return "lightest";
    if (commits < densityRules.base) return "lighter";
    if (commits < densityRules.darker) return "base";
    if (commits < densityRules.darkest) return "darker";
    return "darkest";
  };

  const startDate = fromUnixTime(commitActivity.week);
  const tomorrow = addDays(new Date(), 1);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-4">
        <p className="text-xs">
          {showMonthLabel ? format(startDate, "MMM") : ""}
        </p>
      </div>
      {commitActivity.days.map((commits, idx) => {
        const date = addDays(startDate, idx);

        /* We don't render day activity for future days */
        if (isAfter(date, tomorrow)) {
          return null;
        }

        return (
          <DayActivity
            key={idx}
            commits={commits}
            density={getDensity(commits)}
            date={date}
          />
        );
      })}
    </div>
  );
};
