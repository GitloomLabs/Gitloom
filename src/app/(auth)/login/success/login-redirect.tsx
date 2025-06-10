'use client';

import GitloomIcon from '@/components/icons/gitloom';
import { AnimatedCircularProgressBar } from '@/components/magicui/animated-circular-progress-bar';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { cn, waitFor } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface Task {
  pending: boolean;
  text: string;
}

export default function LoginRedirect() {
  const router = useRouter();

  const [value, setValue] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([
    {
      pending: true,
      text: 'Logging you in...',
    },
  ]);

  const completeAllTasks = useCallback(() => {
    setTasks((prev) => prev.map((t) => ({ ...t, pending: false })));
  }, [setTasks]);

  const addTask = useCallback(
    (task: Task) => {
      completeAllTasks();
      setTasks((prev) => [...prev, task]);
    },
    [completeAllTasks, setTasks],
  );

  useEffect(() => {
    (async () => {
      // task: no.1
      await waitFor(500);
      setValue((prev) => prev + 100 / 3);
      // task: no.2
      addTask({ pending: true, text: 'Looking for your last used repo...' });
      const lastUsedRepo = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_USED_REPO);
      await waitFor(1500);
      setValue((prev) => prev + 100 / 3);
      // task: no.2
      addTask({ pending: true, text: 'Redirecting...' });
      await waitFor(1500);
      if (lastUsedRepo !== null) {
        // window.location.href = `/@${lastUsedRepo}`;
        router.push(`/@${lastUsedRepo}`);
      } else {
        // window.location.href = '/new';
        router.push(`/new`);
      }
    })();
  }, [addTask, router]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <div className="relative grid place-items-center">
        <AnimatedCircularProgressBar
          max={100}
          min={0}
          value={value}
          gaugePrimaryColor="var(--color-muted-foreground)"
          gaugeSecondaryColor="var(--color-muted)"
          className="size-30 stroke-1 [&>span[data-current-value]]:hidden"
        />
        <GitloomIcon className="absolute size-10" />
      </div>
      <div className="relative text-sm [&>span]:whitespace-nowrap">
        {tasks.map((task, idx) => (
          <span
            key={idx}
            className={cn(
              task.pending ? 'text-foreground' : 'text-muted-foreground',
              'animate-in fade-in slide-in-from-bottom-75 absolute left-1/2 -translate-x-1/2 transform font-medium duration-500',
            )}
            style={{ top: `${idx * 1.5}rem` }}
          >
            {task.text}
          </span>
        ))}
      </div>
    </div>
  );
}
