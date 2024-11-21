import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom-component/app-sidebar';
import { ThemeProvider } from '@/components/custom-component/theme-provider';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import ClientComponents from '@/components/client-component';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* <Provider store={store}> */}
                {/* <ClientComponents /> */}
                <div className="flex w-full">
                    <div>
                        <SidebarProvider>
                            <AppSidebar />
                        </SidebarProvider>
                    </div>
                    <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                        </ThemeProvider>
                    <div className="m-8 flex-1">
                        <div className="w-full">{children}</div>
                    </div>
                </div>
                {/* </Provider> */}
            </body>
        </html>
    );
}
