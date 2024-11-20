import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

export function Appbar() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Table</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Chart</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    );
}
