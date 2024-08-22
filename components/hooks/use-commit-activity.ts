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

/* Not proud of this hook. Looks really hacky haha. I'd like to use react-query but I think it's too much for the challenge perspective. My intention here is just to be able to fetch the commit activity of any userAndRepo specified + returning the request state to show a better UI. There are def better ways to handle this but I think it's ok as it is for now. */
export const useCommitActivity: UseCommitActivity = (userAndRepo) => {
  /* This might be controversial but for cases like this I like to have a single piece of state for related data. I wish I could delete all of this and use react-query. */
  const [state, setState] = useState<UseCommitActivityResult>({
    loading: true,
    error: false,
    data: [],
  });

  /* Note: Since this app has only 1 page I don't think is too much necessary to use an AbortController to cancel requests but I'd use it if I need to implement this for real. */
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
        /* For any case where the endpoint doesn't return an array, we consider it as an error. For instance, if we're rate limited. */
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
            /* We transform week from number to a valid Date */
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
