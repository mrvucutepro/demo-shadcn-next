/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
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

const columns = [
    {
        id: 'select',
        header: () => <input type="checkbox" />,
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
        enableSorting: true,
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
        enableSorting: true,
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
        enableSorting: true,
    },
    {
        accessorKey: 'status',
        header: () => 'Status',
        footer: (props) => props.column.id,
        enableSorting: true,
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
];

type ColumnSort = {
    id: string;
    desc: boolean;
};
type SortingState = ColumnSort[];

export const TaskTable = ({ data }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const paginatedData = data.slice(
        pagination.pageIndex * pagination.pageSize,
        (pagination.pageIndex + 1) * pagination.pageSize
    );

    const table = useReactTable({
        data: paginatedData,
        columns,
        state: {
            sorting: sorting,
            pagination,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setFiltering,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
        manualPagination: true,
        manualSorting: true,
        pageCount: Math.ceil(data.length / pagination.pageSize),
    });

    const dispatch = useDispatch();

    // const handleAddNewUser = (newUser) => {
    //     dispatch(addUser(newUser));
    // };

    return (
        <div>
            {/* <Button onClick={openDialog} className="mb-4">
                <Plus /> Add new User
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogComponent
                    isDialogOpen={isDialogOpen}
                    closeDialog={closeDialog}
                    // handleAddNewUser={handleAddNewUser}
                />
            </Dialog> */}

            <div className="relative flex items-center mb-4">
                <Search className="absolute left-3 h-5 w-5 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Your Input"
                    className="pl-10"
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                />
            </div>
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
                                                    { asc: '🔼', desc: '🔽' }[
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
            <div className="flex w-1/4 items-center justify-around mt-4">
                <div>
                    <Button
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="font-bold text-lg hover:text-gray-500"
                    >
                        {'<<'}
                    </Button>
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="font-bold text-lg hover:text-gray-500"
                    >
                        {'<'}
                    </Button>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="font-bold text-lg hover:text-gray-500"
                    >
                        {'>'}
                    </Button>
                    <Button
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                        className="font-bold text-lg hover:text-gray-500"
                    >
                        {'>>'}
                    </Button>
                </div>

                <div>
                    Page{' '}
                    <strong className="text-red-400">
                        {table.getState().pagination.pageIndex + 1}
                    </strong>{' '}
                    of{' '}
                    <strong className="text-red-600">
                        {table.getPageCount()}
                    </strong>
                </div>
                <div>
                    <Select
                        value={String(table.getState().pagination.pageSize)}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={String(pageSize)}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
