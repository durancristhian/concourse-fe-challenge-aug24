import { CommitActivity } from "@/src/components/commit-activity";
import { useCommitActivity } from "@/src/hooks/use-commit-activity";

export default function Page() {
  const commitActivity = useCommitActivity();

  return (
    <main className="m-8">
      <div className="mb-8">
        <h1 className="text-2xl text-center font-bold tracking-wide">
          Concourse FE Challenge (August 2024)
        </h1>
      </div>
      <CommitActivity commitActivity={commitActivity} />
      <div className="mt-8">
        <p className="text-base text-center">
          Repo can be found at{" "}
          <a
            href="https://github.com/durancristhian/concourse-fe-challenge-aug24"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            durancristhian/concourse-fe-challenge-aug24
          </a>
        </p>
      </div>
    </main>
  );
}
