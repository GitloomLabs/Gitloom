import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import useRepoContents from '@/hooks/use-repo-contents';
import { useStableSession } from '@/hooks/use-stable-session';
import { getRepoConfig } from '@/lib/api/github';
import { useRepoStore } from '@/stores/repo.store';
import { Folder, Plus, Search } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import ContentItem from './content-item';
import RepoContentsSkeleton from './repo-contents-skeleton';

interface Props {
  repo: string;
  setIsConfigDialogOpen: (val: boolean) => void;
}

export default function RepoContents({ repo, setIsConfigDialogOpen }: Props) {
  const { session, status } = useStableSession();
  const { setConfig, setIsValid } = useRepoStore((state) => state);
  const { contents, isLoading, navigateTo, navigateBack, canGoBack, breadcrumbs, navigateBackTo } =
    useRepoContents(repo);

  const loadConfigFilePromise = useCallback(
    () =>
      new Promise<void>(async (resolve, reject) => {
        const _config = await getRepoConfig({
          accessToken: session?.accessToken,
          username: session?.user?.username,
          repo,
        });

        if (_config === null) {
          reject();
          setIsConfigDialogOpen(true);
          setIsValid(false);
        } else {
          resolve();
          setConfig(_config);
          setIsValid(true);
        }
      }),
    [session, repo, setIsConfigDialogOpen, setIsValid, setConfig],
  );

  useEffect(() => {
    if (!session) return;

    // call toast to init config
    // and show some feedback
    toast.promise(loadConfigFilePromise, {
      loading: 'Loading config file...',
      success: {
        message: 'Config loaded successfully!',
        description: 'Fetching content based on configuration...',
      },
      error: {
        message: 'Config load failed',
        description: 'Failed to load repo config file.',
      },
    });
  }, [session, loadConfigFilePromise]);

  return (
    <div className="col-span-2 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="flex items-end gap-2">
          <Avatar className="size-5">
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground/50">/</span>
          <button
            className="text-sm font-bold hover:underline"
            onClick={() => navigateBackTo('<root>')}
          >
            {repo}
          </button>
          {breadcrumbs.length > 0 && <span className="text-muted-foreground/50">/</span>}
          {breadcrumbs.map((crumb, idx) => (
            <button
              key={idx}
              className="text-muted-foreground text-sm"
              disabled={idx === breadcrumbs.length - 1}
              onClick={() => navigateBackTo(crumb.path)}
            >
              {crumb.name}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <InputRoot>
            <InputIcon>
              <Search />
            </InputIcon>
            <Input placeholder="Search..." disabled />
          </InputRoot>
          <Button size={'md'}>
            <Plus />
            Add New
          </Button>
        </div>
      </div>
      <div className="mt-2 divide-y overflow-hidden rounded-md border">
        <div className="text-muted-foreground bg-secondary/25 grid grid-cols-5 gap-2 p-3 text-xs font-medium">
          <span className="col-span-2">Name</span>
          <span className="col-span-2">Last commit message</span>
          <span className="ml-auto">Last commit date</span>
        </div>
        {canGoBack && (
          <button
            className="hover:bg-secondary/50 flex w-full items-center gap-2 p-3"
            onClick={navigateBack}
          >
            <Folder className="text-muted-foreground fill-muted-foreground size-4" />
            <span className="text-muted-foreground text-sm">..</span>
          </button>
        )}
        {isLoading || status === 'loading' || !contents ? (
          <RepoContentsSkeleton />
        ) : (
          contents.map((content) => (
            <ContentItem
              key={content.path}
              username={session?.user?.username}
              repo={repo}
              content={content}
              navigateTo={navigateTo}
            />
          ))
        )}
      </div>
    </div>
  );
}
