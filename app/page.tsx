import { CommitActivityGraph } from "@/components/ui/commit-activity-graph";

export default function Page() {
  return (
    <div className="bg-white min-h-screen p-8 text-neutral-800">
      <h1 className="font-bold text-2xl">
        Concourse FE Challenge by Cristhian Duran
      </h1>
      <div className="mb-8 mt-2">
        <p className="text-sm text-zinc-500">
          Repo can be found at{" "}
          <a
            href="https://github.com/durancristhian/concourse-fe-challenge-aug24"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            durancristhian/concourse-fe-challenge-aug24
          </a>
        </p>
      </div>
      {/* This is where the magic happens: the rest is just boilerplate. */}
      <CommitActivityGraph />
    </div>
  );
}
