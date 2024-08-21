import { FC } from "react";
import { ActivityBox, ActivityBoxProps } from "./activity-box";
import { DensityRules } from "@/components/hooks/use-density-rules";
import { addDays } from "date-fns/addDays";
import { isAfter } from "date-fns/isAfter";
import { format } from "date-fns/format";
import { CommitActivity } from "@/components/hooks/use-commit-activity";

export type WeekActivityProps = {
  activity: CommitActivity;
  densityRules: DensityRules;
  showMonthLabel: boolean;
};

export const WeekActivity: FC<WeekActivityProps> = ({
  activity,
  densityRules,
  showMonthLabel,
}) => {
  /* TODO: move this somewhere else to unit test it */
  const getDensity: (commits: number) => ActivityBoxProps["density"] = (
    commits
  ) => {
    if (commits < densityRules.lighter) return "lightest";
    if (commits < densityRules.base) return "lighter";
    if (commits < densityRules.darker) return "base";
    if (commits < densityRules.darkest) return "darker";
    return "darkest";
  };

  const tomorrow = addDays(new Date(), 1);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-4">
        <p className="text-xs">
          {showMonthLabel ? format(activity.week, "MMM") : ""}
        </p>
      </div>
      {activity.days.map((commits, idx) => {
        const date = addDays(activity.week, idx);

        /* We don't render day activity for future days */
        if (isAfter(date, tomorrow)) {
          return null;
        }

        return (
          <ActivityBox key={idx} density={getDensity(commits)}>
            {/*
              - Since this is the only place where I need pluralization, I won't install any external library
              - children here will end up being the tooltip
            */}
            {`${commits || "No"} contribution${
              commits !== 1 ? "s" : ""
            } on ${format(date, "PPPP")}`}
          </ActivityBox>
        );
      })}
    </div>
  );
};
