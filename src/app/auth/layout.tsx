import { Footer } from '@/components/footer';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='h-screen min-h-screen overflow-auto flex items-start justify-center py-8 px-4 md:px-0'>
        {children}
      </div>
      <Footer />
    </>
  );
}
