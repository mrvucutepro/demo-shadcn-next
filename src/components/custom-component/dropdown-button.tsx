/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { Row } from "@tanstack/react-table";


import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleX, Ellipsis, Settings } from 'lucide-react';
import { IUser } from '@/app/page';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onSelected: (userSelected: IUser) => void;
  }
export function DropdownMenuButton<TData>({
    row,
    onSelected,
}:DataTableRowActionsProps<TData> & {userSelected: TData}){
    const user = row.original;
    const handleSelect = (user) => {
        onSelected(user); 
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=> handleSelect(user)}>
                    <Settings />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=> handleSelect(user)}>
                    <CircleX />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
