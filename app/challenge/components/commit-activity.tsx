import { FC } from "react";
import { WeekActivity, WeekActivityProps } from "./week-activity";
import { useDensityRules } from "../hooks/use-density-rules";
import { fromUnixTime } from "date-fns/fromUnixTime";
import { format } from "date-fns/format";
import { addDays } from "date-fns/addDays";
import { subDays } from "date-fns/subDays";
import clsx from "clsx";
import { bgByDensity } from "./day-activity";

interface CommitActivityProps {
  commitActivity: WeekActivityProps["commitActivity"][];
}

export const CommitActivity: FC<CommitActivityProps> = ({ commitActivity }) => {
  const densityRules = useDensityRules(commitActivity);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center gap-2">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-6"></div>
          <div className="h-4 w-6">
            <p className="text-xs">Mon</p>
          </div>
          <div className="h-4 w-6"></div>
          <div className="h-4 w-6">
            <p className="text-xs">Wed</p>
          </div>
          <div className="h-4 w-6"></div>
          <div className="h-4 w-6">
            <p className="text-xs">Fri</p>
          </div>
          <div className="h-4 w-6"></div>
        </div>
        {commitActivity.map((activity, idx) => {
          const firstDayOfTheWeek = fromUnixTime(activity.week);
          const lastWeek = subDays(firstDayOfTheWeek, 7);

          const showMonthLabel =
            !idx || firstDayOfTheWeek.getMonth() !== lastWeek.getMonth();

          return (
            <WeekActivity
              key={activity.week}
              commitActivity={activity}
              densityRules={densityRules}
              showMonthLabel={showMonthLabel}
            />
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mb-2 mt-8">
        <p className="text-xs">Less</p>
        <div
          className={clsx(
            "h-4 w-4 rounded border border-gray-500",
            bgByDensity["lightest"]
          )}
        />
        <div className={clsx("h-4 w-4 rounded", bgByDensity["lighter"])} />
        <div className={clsx("h-4 w-4 rounded", bgByDensity["base"])} />
        <div className={clsx("h-4 w-4 rounded", bgByDensity["darker"])} />
        <div className={clsx("h-4 w-4 rounded", bgByDensity["darkest"])} />
        <p className="text-xs">More</p>
      </div>
    </div>
  );
};
