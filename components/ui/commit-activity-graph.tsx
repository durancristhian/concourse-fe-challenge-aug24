"use client";

import { useCommitActivity } from "@/components/hooks/use-commit-activity";
import { useDensityRules } from "@/components/hooks/use-density-rules";
import { subDays } from "date-fns/subDays";
import { FC } from "react";
import { ActivityBox } from "./activity-box";
import { WeekActivity } from "./week-activity";

/* IDEA: This could be something the user can type so we can have a dynamic chart. */
const USER_AND_REPO = "facebook/react";

export const CommitActivityGraph: FC = () => {
  const {
    loading,
    error,
    data: commitActivity,
  } = useCommitActivity(USER_AND_REPO);
  const densityRules = useDensityRules(commitActivity);

  if (loading) {
    /* Note: Ideally, this would be a separated component. */
    return (
      <p className="italic">
        Loading commit activity for{" "}
        <span className="font-bold">{USER_AND_REPO}</span>...
      </p>
    );
  }

  if (error) {
    /* Note: Ideally, this would be a separated component. */
    return (
      <p className="font-bold text-red-800">
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
      <div className="my-4 overflow-x-auto pb-2">
        <div className="flex gap-2">
          <DayLabels />
          {commitActivity.map((activity, idx) => {
            const previousWeek = subDays(activity.week, 7);

            /* We show the month label when in the first rendered week of the graph OR when we have a different month in comparison with the previous one. */
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

/* I don't think these components deserve their own specific file. */
const DayLabels: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-8"></div>
      <div className="h-4 w-8"></div>
      <div className="h-4 w-8">
        <p className="text-xs">Mon</p>
      </div>
      <div className="h-4 w-8"></div>
      <div className="h-4 w-8">
        <p className="text-xs">Wed</p>
      </div>
      <div className="h-4 w-8"></div>
      <div className="h-4 w-8">
        <p className="text-xs">Fri</p>
      </div>
      <div className="h-4 w-8"></div>
    </div>
  );
};

const ChartFooter: FC = () => {
  return (
    <div className="flex gap-2">
      <p className="text-xs w-8">Less</p>
      <ActivityBox density="lightest" />
      <ActivityBox density="lighter" />
      <ActivityBox density="base" />
      <ActivityBox density="darker" />
      <ActivityBox density="darkest" />
      <p className="text-xs w-8">More</p>
    </div>
  );
};
