import commitActivity from "@/public/commit_activity.json";

export type CommitActivity = {
  total: number;
  week: number;
  days: number[];
};

type UseCommitActivity = () => CommitActivity[];

/* TODO: would be cool to make a real fetch here but this works for now */
export const useCommitActivity: UseCommitActivity = () => {
  return commitActivity;
};
