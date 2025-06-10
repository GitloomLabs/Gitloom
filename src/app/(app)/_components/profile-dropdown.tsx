'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function UserDropdown({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { username, name, email } = session?.user || {};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground flex w-full flex-col text-sm font-normal"
          >
            {' '}
            <span className="text-foreground font-medium">{name}</span>
            <span className="text-muted-foreground text-xs font-normal">{email}</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            signOut({ callbackUrl: '/login' });
          }}
          className="text-destructive focus:text-destructive/90 flex items-center justify-between font-medium"
        >
          Log out
          <LogOutIcon size={14} className="text-muted-foreground ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
