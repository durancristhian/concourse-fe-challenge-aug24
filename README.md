# concourse-fe-challenge-aug24

[Live demo](https://concourse-fe-challenge-aug24.vercel.app)

## Requirements

Create the GitHub commit activity graph using [this data](https://api.github.com/repos/facebook/react/stats/commit_activity)

### Important:

Commit color density should be relative to the highest single day activity and broken into 4 quarters. For example, if the highest single day activity is 84 commits the breakdown of color density would be:

- Darkest: 63-84 commits
- Darker: 42 - 62 commits
- Base: 21 - 41 commits
- Lighter: 1 - 21 commits
- Lightest (empty): 0 commits

## How to run this project locally

First, run the development server by running

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Developer notes for people reviewing this repo

- Left code comments all over the codebase to explain what I'm doing and why or potential future refactors.
- This is NOT a responsive-design first project. However, the graph uses horizontal scroll if needed.
- I used a some external libraries for simple stuff (tooltips and CSS classes concatenation). I was tempted to install react-query as well to replace a hook I created to fetch the commit activity data but I preferred not to do so for no special reason.
- I didn't install any UI library (such as MUI). I decided to build stuff directly with Tailwind. I have to admit I missed a lot the benefits of having a library (Built-in tooltips support, ay11, Grid component, etc) but I felt a little bit too much for this project.
