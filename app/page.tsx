import { CommitActivityGraph } from "@/components/ui/commit-activity-graph";

export default function Page() {
  return (
    <div className="flex flex-col gap-16 p-8">
      <h1 className="font-bold text-2xl">
        Concourse FE Challenge by Cristhian Duran
      </h1>
      <div>
        <CommitActivityGraph />
      </div>
      <p className="text-base">
        Repo can be found at{" "}
        <a
          href="https://github.com/durancristhian/concourse-fe-challenge-aug24"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-blue-500 underline"
        >
          durancristhian/concourse-fe-challenge-aug24
        </a>
      </p>
    </div>
  );
}
