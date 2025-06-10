import GitloomIcon from '@/components/icons/gitloom';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="grid place-items-center border-t py-8">
      <div className="mx-auto w-full max-w-300">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <nav className="text-muted-foreground [&>a]:hover:text-foreground flex flex-wrap items-center gap-4 text-sm [&>a]:transition-colors">
            <GitloomIcon className="size-5" />
            <Link href={'/'}>Home</Link>
            <a
              href="https://github.com/GitloomLabs/Gitloom/discussions"
              target="_blank"
              rel="noreferrer noopener"
            >
              Discussions
            </a>
            <a
              href="https://github.com/GitloomLabs/Gitloom/issues"
              target="_blank"
              rel="noreferrer noopener"
            >
              Issue Tracker
            </a>
            <button className="hover:text-foreground flex items-center gap-2 transition-colors">
              Legal <ChevronDown className="size-4" />
            </button>
          </nav>
          <span className="text-muted-foreground text-xs">
            &copy; {new Date(Date.now()).getFullYear()}, GitloomLabs. MIT License
          </span>
        </div>
      </div>
    </footer>
  );
}
