import { CommitActivity } from "./use-commit-activity";

export type DensityRules = {
  darkest: number;
  darker: number;
  base: number;
  lighter: number;
  lightest: number;
};

type UseDensityRules = (commitActivity: CommitActivity[]) => DensityRules;

export const useDensityRules: UseDensityRules = (commitActivity) => {
  /* We accumulate in a single array all the commit activity per days */
  const commitActivities = commitActivity.reduce<number[]>(
    (acc, curr) => [...acc, ...curr.days],
    []
  );

  /* We get the max activity day */
  const maxCommitActivity = Math.max(...commitActivities);

  const getThreshold: (activity: number, percentage: number) => number = (
    activity,
    percentage
  ) => Math.floor(activity * percentage);

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
