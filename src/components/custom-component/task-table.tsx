/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Plus, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { DialogComponent } from './custom-dialog';
import { useDispatch } from 'react-redux';
import { addUser } from '@/redux/userSlice';
import { DropdownMenuButton } from './dropdown-button';
import { TaskTablePagination } from './task-table-pagination';
import { SearchComponent } from './search-component';
import { usePagination } from '@/ContextApi/paginationContext';

export const TaskTable = ({ data }) => {
    const { pagination, setPagination, paginatedData } = usePagination();
    const [filtering, setFiltering] = useState('');
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const columns = [
        {
            id: 'select',
            header: () => <input type="checkbox" />,
            enableSorting: true,
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={() => row.toggleSelected()}
                />
            ),
        },
        {
            accessorKey: 'id',
            header: () => 'ID',
            footer: (props) => props.column.getHeader(),
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            footer: (props) => props.column.id,
            enableSorting: true,
        },
        {
            accessorKey: 'avatar',
            header: () => 'Avatar',
            footer: (props) => props.column.id,
            cell: (info) => {
                return (
                    <span className="avatar-column">
                        <img
                            src={info.value}
                            alt="Avatar"
                            className="h-8 w-8 rounded-full"
                        />
                    </span>
                );
            },
        },
        {
            accessorKey: 'email',
            header: () => 'Email',
            footer: (props) => props.column.id,
            enableSorting: true,
        },
        {
            accessorKey: 'address',
            header: () => 'Address',
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            footer: (props) => props.column.id,
            cell: (info) => {
                return (
                    <span
                        className={`${
                            info.getValue() === 'Active'
                                ? ' bg-green-500 text-gray-200 p-4 rounded-full'
                                : ' bg-red-500 text-black p-4 rounded-full'
                        }`}
                    >
                        {info.getValue()}
                    </span>
                );
            },
        },
        {
            id: 'action',
            header: () => 'Action',
            footer: (props) => props.column.id,
            cell: () => {
                return (
                    <DropdownMenuButton
                    // onDelete={() => onDeleteUser(user.id)}
                    />
                );
            },
        },
    ];

    const table = useReactTable({
        data: paginatedData,
        columns,
        state: {
            pagination,
            globalFilter: filtering,
        },
        onPaginationChange: setPagination,
        onGlobalFilterChange: setFiltering,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
        manualPagination: true,
        pageCount: Math.ceil(data.length / pagination.pageSize),
    });

    return (
        <div>
            <SearchComponent
                filtering={filtering}
                setFiltering={setFiltering}
            />
            <div className="relative w-full">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    {
                                                        asc: (
                                                            <i data-lucide="chevron-up" />
                                                        ),
                                                        desc: (
                                                            <i data-lucide="chevron-down" />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() ??
                                                            null
                                                    ]
                                                }
                                            </div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                </Table>
                <ScrollArea className="h-[600px] rounded-md border overflow-auto">
                    <Table className="w-full table-fixed border-collapse">
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
            <TaskTablePagination table={table} />
        </div>
    );
};
