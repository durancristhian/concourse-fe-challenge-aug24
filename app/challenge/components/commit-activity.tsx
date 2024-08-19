import { FC } from "react";
import { WeekActivity, WeekActivityProps } from "./week-activity";
import { useDensityRules } from "../hooks/use-density-rules";

interface CommitActivityProps {
  commitActivity: WeekActivityProps["commitActivity"][];
}

export const CommitActivity: FC<CommitActivityProps> = ({ commitActivity }) => {
  const densityRules = useDensityRules(commitActivity);

  return (
    <div className="flex p-1">
      {commitActivity.map((activity) => (
        <WeekActivity
          key={activity.week}
          commitActivity={activity}
          densityRules={densityRules}
        />
      ))}
    </div>
  );
};
