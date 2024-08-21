import { CommitActivity } from "./use-commit-activity";

export type DensityRules = {
  darkest: number;
  darker: number;
  base: number;
  lighter: number;
  lightest: number;
};

type UseDensityRules = (commitActivity: CommitActivity[]) => DensityRules;

/* This hook gets the commit activity from a repo and returns the proper density rules to measure each commit activity day. */
export const useDensityRules: UseDensityRules = (commitActivity) => {
  /* We accumulate in a single array all the commit activity per day */
  const commitActivities = commitActivity.reduce<number[]>(
    (acc, curr) => [...acc, ...curr.days],
    []
  );

  /* We get the max value out of it */
  const maxCommitActivity = Math.max(...commitActivities);

  const getThreshold: (activity: number, percentage: number) => number = (
    activity,
    percentage
  ) => Math.floor(activity * percentage);

  /* The percentages in comments below were calculated at a quick glance for me based on the challenge requirements. */
  return {
    /* +52% */
    darkest: getThreshold(maxCommitActivity, 0.52),
    /* 35% -> 51% */
    darker: getThreshold(maxCommitActivity, 0.35),
    /* 17% -> 34% */
    base: getThreshold(maxCommitActivity, 0.17),
    /* any value bigger than 0 -> 16% */
    lighter: 1,
    lightest: 0,
  };
};
