import { signIn } from '@/auth';
import GitHubIcon from '@/components/icons/github';
import GitLabIcon from '@/components/icons/gitlab';
import GitLoomIcon from '@/components/icons/gitloom';
import GitLoomTextIcon from '@/components/icons/gitloom-text';
import { Button } from '@/components/ui/button';
import { Box, FolderLock, ShieldCheck, WandSparkles } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login – GitLoom',
};

export default async function Page() {
  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      <div className="bg-card/50 hidden place-items-center border-r px-8 md:grid lg:px-0">
        <div className="flex w-full max-w-100 flex-col gap-4">
          <ShieldCheck className="text-muted-foreground size-15 stroke-1" />
          <h4 className="text-3xl font-black lg:text-4xl">Your data is yours.</h4>
          <div className="text-muted-foreground flex gap-2 text-sm">
            <Box className="size-5 shrink-0" />
            <span>GitLoom is decentralized and doesn&apos;t rely on any cetralized database.</span>
          </div>
          <div className="text-muted-foreground flex gap-2 text-sm">
            <FolderLock className="size-5 shrink-0" />
            <span>
              Nothing is stored, ever.
              <br />
              Content stays in your repo.
            </span>
          </div>
          <div className="text-muted-foreground flex gap-2 text-sm">
            <WandSparkles className="size-5 shrink-0" />
            <span>Build fast, own forever.</span>
          </div>
        </div>
      </div>
      <div className="grid place-items-center px-4 lg:px-0">
        <div className="flex w-full max-w-75 flex-col items-center justify-center gap-4">
          <GitLoomIcon className="size-7" />
          <GitLoomTextIcon className="h-5 w-auto" />
          <span className="text-muted-foreground text-center text-sm">
            The Git-native CMS for modern content workflows.
          </span>
          <div className="flex w-full flex-col gap-4">
            <form
              onSubmit={async () => {
                'use server';
                await signIn('github', {
                  redirectTo: '/login/success',
                });
              }}
            >
              <Button type="submit" size={'md'} className="w-full">
                <GitHubIcon className="size-5" />
                Sign in with Github
              </Button>
            </form>
            <Button size={'md'} variant={'secondary'} disabled>
              <GitLabIcon className="fill-foreground size-5" />
              Sign in with Gitlab
            </Button>
          </div>
          <span className="text-muted-foreground mt-4 text-center text-sm">
            By signing in, you agree to our <br />
            <Link href={'/legal/terms-of-service'} className="hover:underline">
              terms of service
            </Link>{' '}
            and{' '}
            <Link href={'/legal/privacy-policy'} className="hover:underline">
              privacy policy
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
