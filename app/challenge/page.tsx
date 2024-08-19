import { CommitActivity } from "@/app/challenge/components/commit-activity";
import useCommitActivity from "@/app/challenge/hooks/use-commit-activity";

export default function Page() {
  const commitActivity = useCommitActivity();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl">Concourse FE Challenge (August 2024)</h1>
      <CommitActivity commitActivity={commitActivity} />
    </main>
  );
}
