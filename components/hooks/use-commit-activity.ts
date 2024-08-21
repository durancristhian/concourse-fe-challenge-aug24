import { fromUnixTime } from "date-fns/fromUnixTime";
import { useEffect, useState } from "react";

export type CommitActivity = {
  total: number;
  week: Date;
  days: number[];
};

type UseCommitActivityResult = {
  loading: boolean;
  error: boolean;
  data: CommitActivity[];
};

type UseCommitActivity = (userAndRepo: string) => UseCommitActivityResult;

/* I'm not using react-query here but I'd like to. */
export const useCommitActivity: UseCommitActivity = (userAndRepo) => {
  const [state, setState] = useState<UseCommitActivityResult>({
    loading: true,
    error: false,
    data: [],
  });

  useEffect(() => {
    fetch(`https://api.github.com/repos/${userAndRepo}/stats/commit_activity`)
      .then(
        (response) =>
          response.json() as Promise<
            /* This type is a bit different from CommitActivity since is the one returned by the API */
            {
              total: number;
              week: number;
              days: number[];
            }[]
          >
      )
      .then((data) => {
        if (!Array.isArray(data)) {
          setState({
            loading: false,
            error: true,
            data: [],
          });
        }

        setState({
          loading: false,
          error: false,
          data: data.map((commitActivity) => ({
            ...commitActivity,
            week: fromUnixTime(commitActivity.week),
          })),
        });
      })
      .catch(() => {
        setState({
          loading: false,
          error: true,
          data: [],
        });
      });
  }, [userAndRepo]);

  return state;
};
