import { CommitActivity } from "@/components/hooks/use-commit-activity";
import { DensityRules } from "@/components/hooks/use-density-rules";
import { addDays } from "date-fns/addDays";
import { format } from "date-fns/format";
import { isAfter } from "date-fns/isAfter";
import { FC } from "react";
import { ActivityBox, ActivityBoxProps } from "./activity-box";

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
  /* NOTE: I think this small bussiness logic fn could be a util but I'll keep it here. I'd def move it out of this component if I write unit tests. */
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

        /* We don't render the activity box for future days */
        if (isAfter(date, tomorrow)) {
          return null;
        }

        return (
          <ActivityBox key={idx} density={getDensity(commits)}>
            {/* NOTE: Since this is the only place where I need pluralization, I won't install any external library */}
            <p className="text-sm">{`${commits || "No"} contribution${
              commits !== 1 ? "s" : ""
            } on ${format(date, "PPPP")}`}</p>
          </ActivityBox>
        );
      })}
    </div>
  );
};
