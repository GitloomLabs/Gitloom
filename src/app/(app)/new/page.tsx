import { Construction } from 'lucide-react';
import { Metadata } from 'next';
import RepoList from './_components/repo-list';

export const metadata: Metadata = {
  title: 'New Repo',
};

export default async function Page() {
  return (
    <div className="mx-auto my-10 w-full max-w-5xl space-y-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-4xl font-black">Let&apos;s do something new.</h3>
        <span className="text-muted-foreground text-sm">
          Select a repository to link with Gitloom and start managing your content.
        </span>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-card/50 space-y-4 rounded-lg border p-4">
          <h5 className="text-xl font-bold">Import Git Repo</h5>
          <RepoList />
        </div>
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div>
            <h5 className="text-xl font-bold">Clone Template</h5>
            <span className="text-muted-foreground text-sm">
              Clone from our starter collection.
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Construction className="text-muted-foreground size-10 stroke-1" />
            <span className="text-muted-foreground text-sm">(Feature comin&apos; soon)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
