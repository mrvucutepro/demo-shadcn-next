'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Expense } from './schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenuButton } from '@/components/custom-component/dropdown-button';
import { IUser } from '../page';

export const columns: ColumnDef<Expense>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-0.5"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-0.5"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => (
            <div className="w-[150px] capitalize">{row.getValue('id')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {row.getValue('name')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'avatar',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Avatar" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <img src={row.getValue('avatar')}></img>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {row.getValue('email')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'address',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium capitalize">
                        {row.getValue('address')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    {row.getValue('status') === 'Active' ? (
                        <span className="max-w-[500px] truncate font-medium capitalize rounded-full p-2 bg-green-500">
                            {row.getValue('status')}
                        </span>
                    ) : (
                        <span className="max-w-[500px] truncate font-medium capitalize rounded-full p-2 bg-red-500">
                            {row.getValue('status')}
                        </span>
                    )}
                </div>
            );
        },
    },
    // {
    //     id: 'action',
    //     cell: ({ row }) => {
    //       const user = row.original;
    //       const onSelected = (userSelected) => {
    //         console.log("Selected User:", userSelected);
    //       }

    //         return (
    //             <DropdownMenuButton
    //                 row={row}
    //                 onSelected={onSelected}
    //                 userSelected={user}
    //             />
    //         );
    //     },
    // },
];
