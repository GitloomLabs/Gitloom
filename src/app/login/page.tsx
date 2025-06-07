import GithubIcon from '@/components/icons/github';
import GitloomIcon from '@/components/icons/gitloom';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login — Gitloom',
};

export default function Page() {
  return (
    <div className="flex min-h-dvh items-center justify-center gap-8">
      <div className="h-80 w-40 rounded-l-2xl bg-[url(/images/auth-bg.jpg)] bg-cover bg-no-repeat"></div>
      <div className="flex h-80 w-max flex-col gap-4">
        <Link href={'/'} className="w-max">
          <GitloomIcon className="size-10" />
        </Link>
        <div className="flex flex-col gap-2">
          <h4 className="text-4xl font-black">Login</h4>
          <span className="text-muted-foreground text-sm">
            Log in to weave content into your repo.
          </span>
        </div>
        <Button size={'default'}>
          <GithubIcon className="size-5" />
          Login with Github
        </Button>
        <span className="text-muted-foreground text-sm">(More platforms coming soon.)</span>
        <div className="mt-auto flex flex-col gap-2 text-sm">
          <span>GitloomLabs &copy; {new Date(Date.now()).getFullYear()}</span>
          <div className="text-muted-foreground flex items-center gap-2">
            <a
              href="https://github.com/GitloomLabs/Gitloom"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline"
            >
              Github
            </a>
            -
            <Link href={'/legal/privacy-policy'} className="hover:underline">
              Privacy Policy
            </Link>
            -
            <Link href={'/legal/terms-of-service'} className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
