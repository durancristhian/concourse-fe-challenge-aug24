"use client";

import { FC } from "react";
import { WeekActivity } from "./week-activity";
import { useDensityRules } from "@/components/hooks/use-density-rules";
import { subDays } from "date-fns/subDays";
import { useCommitActivity } from "@/components/hooks/use-commit-activity";
import { ActivityBox } from "./activity-box";

/* IDEA: This could be something the user can type so we can make the chart dynamic. */
const USER_AND_REPO = "facebook/react";

export const CommitActivityGraph: FC = () => {
  const {
    loading,
    error,
    data: commitActivity,
  } = useCommitActivity(USER_AND_REPO);
  const densityRules = useDensityRules(commitActivity);

  if (loading) {
    return (
      <p className="text-base italic">
        Loading commit activity for{" "}
        <span className="font-bold">{USER_AND_REPO}</span>...
      </p>
    );
  }

  if (error) {
    return (
      <p className="font-bold text-base text-red-800">
        An error has ocurred. Try again in a few minutes since you could be rate
        limited by the GitHub API.
      </p>
    );
  }

  return (
    <>
      <h2 className="font-semibold text-xl">
        Commit activity for {USER_AND_REPO}
      </h2>
      <div className="mb-4 overflow-x-auto py-4">
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
    <div className="flex gap-2">
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
