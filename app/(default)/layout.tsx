import type { Metadata } from 'next';
import '../globals.css';
import { Providers } from '@/lib/providers';
import { CookiesProvider } from 'next-client-cookies/server';
import { montserrat } from '@/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s | Login Page Demo',
    default: 'Login Page Demo',
  },
  description: 'Made using NextJs, TS, Shadcn UI, Next-Auth and Supabase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.style} antialiased`}>
        <CookiesProvider>
          <Providers>{children}</Providers>
        </CookiesProvider>
      </body>
    </html>
  );
}
