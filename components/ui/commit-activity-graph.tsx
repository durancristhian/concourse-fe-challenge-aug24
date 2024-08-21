import { FC } from "react";
import { WeekActivity, WeekActivityProps } from "./week-activity";
import { useDensityRules } from "@/components/hooks/use-density-rules";
import { subDays } from "date-fns/subDays";
import { CommitActivity as TCommitActivity } from "@/components/hooks/use-commit-activity";
import { ActivityBox } from "./activity-box";

type CommitActivityProps = {
  commitActivity: TCommitActivity[];
};

export const CommitActivityGraph: FC<CommitActivityProps> = ({
  commitActivity,
}) => {
  const densityRules = useDensityRules(commitActivity);

  return (
    <>
      <div className="mb-4 overflow-x-auto pb-4">
        <div className="flex gap-2">
          <DayLabels />
          {commitActivity.map((activity, idx) => {
            const previousWeek = subDays(activity.week, 7);

            /* We show the month label when in the first week of the graph or when we have a different month */
            const showMonthLabel =
              !idx || activity.week.getMonth() !== previousWeek.getMonth();

            return (
              <WeekActivity
                key={idx}
                activity={activity}
                densityRules={densityRules}
                showMonthLabel={showMonthLabel}
              />
            );
          })}
        </div>
      </div>
      <ChartFooter />
    </>
  );
};

/* Don't think these components deserve their own specific file */
const DayLabels: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-6"></div>
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
  );
};

const ChartFooter: FC = () => {
  return (
    <div className="flex gap-2 justify-center">
      <p className="text-xs">Less</p>
      <ActivityBox density="lightest" />
      <ActivityBox density="lighter" />
      <ActivityBox density="base" />
      <ActivityBox density="darker" />
      <ActivityBox density="darkest" />
      <p className="text-xs">More</p>
    </div>
  );
};
