'use client';

import GitloomIcon from '@/components/icons/gitloom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserDropdown from './user-dropdown';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isNewPath = pathname === '/new';

  return (
    <header className="flex h-15 items-center justify-between gap-2 border-b px-4">
      <nav className="flex items-center gap-2">
        <Link href={'/dashboard'} className="flex items-center gap-2">
          <GitloomIcon className="size-5" />
        </Link>
        {!isNewPath && (
          <>
            <span className="text-muted-foreground/50 text-xl">/</span>
            <Button variant={'ghost'} className="gap-2">
              <Avatar className="size-5">
                <AvatarImage src={session?.user?.image ?? undefined} />
              </Avatar>
              <span className="text-sm font-bold">gitloom-repo</span>
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </>
        )}
      </nav>
      <div className="flex items-center gap-4">
        <Button variant={'outline'}>Feedback</Button>
        <UserDropdown></UserDropdown>
      </div>
    </header>
  );
}
