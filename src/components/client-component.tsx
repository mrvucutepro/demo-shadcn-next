// ClientComponents.tsx
'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom-component/app-sidebar';
import { ThemeProvider } from '@/components/custom-component/theme-provider';

export default function ClientComponents() {
    return (
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
        </div>
    );
}
