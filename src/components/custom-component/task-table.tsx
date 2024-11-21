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
import Image from 'next/image';
import { DataTablePagination } from './data-table-pagination';

export const TaskTable = ({ data, columns ,onDeleteUser}) => {
    const { pagination, setPagination, paginatedData } = usePagination();
    const [filtering, setFiltering] = useState('');

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
                                                            '🔼'
                                                        ),
                                                        desc: (
                                                            '🔽'
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
                <ScrollArea className="h-[650px] rounded-md border overflow-auto">
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
            <DataTablePagination table={table}/>
        </div>
    );
};
