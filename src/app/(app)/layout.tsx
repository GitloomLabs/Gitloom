import Footer from './_components/footer';
import Header from './_components/header/header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <div className="mx-auto min-h-[calc(100dvh-3.75rem)] max-w-300 px-5 lg:px-0">{children}</div>
      <Footer />
    </main>
  );
}
