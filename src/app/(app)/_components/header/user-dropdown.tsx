'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLink, LogOutIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function UserDropdown() {
  const { data: session } = useSession();
  const { username, name, email, image } = session?.user ?? {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full flex-col items-start"
          >
            <span className="text-foreground text-sm font-medium">{name}</span>
            <span className="text-muted-foreground line-clamp-1 text-xs break-all">{email}</span>
          </a>
          <DropdownMenuShortcut>
            <ExternalLink className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Log out
          <DropdownMenuShortcut>
            <LogOutIcon className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
