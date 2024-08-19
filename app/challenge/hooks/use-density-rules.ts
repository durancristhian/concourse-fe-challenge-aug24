import { WeekActivityProps } from "../components/week-activity";

export type DensityRulesResult = {
  darkest: number;
  darker: number;
  base: number;
  lighter: number;
  lightest: number;
};

type UseDensityRules = (
  commitActivity: WeekActivityProps["commitActivity"][]
) => DensityRulesResult;

export const useDensityRules: UseDensityRules = (commitActivity) => {
  /* TODO: research the need for the number[] type */
  const commitActivities = commitActivity.reduce<number[]>(
    (acc, curr) => [...acc, ...curr.days],
    []
  );

  const maxCommitActivity = Math.max(...commitActivities);

  const getRule = (activity: number, percentage: number) =>
    Math.floor(activity * percentage);

  return {
    /* +52% */
    darkest: getRule(maxCommitActivity, 0.52),
    /* 35% -> 51% */
    darker: getRule(maxCommitActivity, 0.35),
    /* 17% -> 34% */
    base: getRule(maxCommitActivity, 0.17),
    /* any value bigger than 0 -> 16% */
    lighter: 1,
    lightest: 0,
  };
};
