# concourse-fe-challenge-aug24

Create the GitHub commit activity graph using this data: https://api.github.com/repos/facebook/react/stats/commit_activity

Notes:
Commit color density should be relative to the highest single day activity and broken into 4 quarters.

For example, if the highest single day activity is 84 commits the breakdown of color density would be:

- Darkest: 63-84 commits
- Darker: 42 - 62 commits
- Base: 21 - 41 commits
- Lighter: 1 - 21 commits
- Lightest (empty): 0 commits
