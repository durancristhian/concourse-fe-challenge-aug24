import commitActivity from "@/public/commit_activity.json";
import { fromUnixTime } from "date-fns/fromUnixTime";

export type CommitActivity = {
  total: number;
  week: Date;
  days: number[];
};

type UseCommitActivity = () => CommitActivity[];

/* TODO: would be cool to make a real fetch here but this works for now */
export const useCommitActivity: UseCommitActivity = () => {
  return commitActivity.map((activity) => ({
    ...activity,
    week: fromUnixTime(activity.week),
  }));
};
