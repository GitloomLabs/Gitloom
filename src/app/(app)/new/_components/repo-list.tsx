'use client';

import GithubIcon from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import useDebounce from '@/hooks/use-debounce';
import datetime from '@/lib/date-time';
import { useQuery } from '@tanstack/react-query';
import { Lock, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface Repo {
  id: number;
  name: string;
  private: boolean;
  updated_at: string;
  html_url: string;
}

async function fetchRepos({
  accessToken,
  username,
  query,
}: {
  accessToken: string;
  username: string;
  query: string;
}): Promise<Repo[]> {
  const url = `https://api.github.com/search/repositories?q=${query}+user:${username}&sort=updated&per_page=5`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return data.items.map((repo: Repo) => ({
    id: repo.id,
    name: repo.name,
    private: repo.private,
    updated_at: repo.updated_at,
    html_url: repo.html_url,
  }));
}

export default function RepoList() {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const username = session?.user?.username;
  console.log(session?.user);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: repos, isLoading } = useQuery({
    queryKey: ['repos', username, debouncedSearch],
    queryFn: () =>
      fetchRepos({
        accessToken: accessToken!,
        username: username!,
        query: debouncedSearch,
      }),
    // only fetch if there is valid session
    enabled: !!accessToken && !!username,
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {status === 'loading' ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Select defaultValue={String(username)} disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select username" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={String(username)}>{username}</SelectItem>
            </SelectContent>
          </Select>
        )}

        <InputRoot>
          <InputIcon>
            {debouncedSearch.length > 0 && isLoading ? (
              <Spinner className="bg-foreground" />
            ) : (
              <Search />
            )}
          </InputIcon>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputRoot>
      </div>
      <div className="divide-y rounded-md border">
        {(status === 'loading' || isLoading) &&
          Array.from({ length: 5 }).map((_, idx) => {
            const minRem = 10;
            const maxRem = 15;
            const randomRem = minRem + ((idx * 2) % (maxRem - minRem + 1));

            return (
              <div key={idx} className="flex h-14 items-center gap-2 px-3">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-5" style={{ width: `${randomRem}rem` }} />
                <Skeleton className="ml-auto h-8 w-17" />
              </div>
            );
          })}
        {repos?.map((repo) => (
          <div key={repo.id} className="flex h-14 items-center gap-2 px-3">
            <GithubIcon className="fill-muted-foreground size-5" />
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-medium hover:underline"
            >
              {repo.name}
            </a>
            {repo.private && <Lock className="text-muted-foreground size-3.5" />}
            <span className="text-muted-foreground text-sm">
              {datetime(repo.updated_at).fromNow()}
            </span>
            <Button className="ml-auto">Import</Button>
          </div>
        ))}
      </div>
    </>
  );
}
